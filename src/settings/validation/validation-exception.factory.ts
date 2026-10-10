import { BadRequestException, ValidationError } from '@nestjs/common';
import { getMetadataStorage } from 'class-validator';
import { I18nContext } from 'nestjs-i18n';

const VALIDATION_PREFIX = 'validation';
const CONSTRAINT_ARG_NAMES: Record<string, string[]> = {
  min: ['min'],
  max: ['max'],
  minLength: ['minLength'],
  maxLength: ['maxLength'],
  matches: ['pattern'],
  is: ['is'],
  isNot: ['isNot'],
  isAnyOf: ['isAnyOf'],
  isNoneOf: ['isNoneOf'],
  isContainedIn: ['isContainedIn'],
  isNotContainedIn: ['isNotContainedIn'],
};

const getConstraintArgs = (
  error: ValidationError,
  constraint: string,
): Record<string, unknown> => {
  const args: Record<string, unknown> = {};
  const target = error.target;

  if (!target || typeof target !== 'object') {
    return args;
  }

  const constructor = target.constructor as Function;
  const metadatas = getMetadataStorage().getTargetValidationMetadatas(
    constructor,
    constructor.name,
    false,
    false,
  );
  const matched = metadatas.find(
    (metadata) =>
      metadata.propertyName === error.property &&
      (metadata.type === constraint || metadata.name === constraint),
  );

  const argNames = CONSTRAINT_ARG_NAMES[constraint] ?? [constraint];
  matched?.constraints?.forEach((value, index) => {
    args[argNames[index] ?? `${constraint}${index + 1}`] = value;
  });

  return args;
};

const translateConstraint = (
  error: ValidationError,
  constraint: string,
  field: string,
  i18n: I18nContext,
): string => {
  const fallback = error.constraints?.[constraint] ?? constraint;

  return String(
    i18n.t(`${VALIDATION_PREFIX}.${constraint}`, {
      lang: i18n.lang,
      defaultValue: fallback,
      args: {
        field,
        property: field,
        value: error.value,
        ...getConstraintArgs(error, constraint),
      },
    }),
  );
};

const groupErrors = (
  errors: ValidationError[],
  i18n: I18nContext,
  parentPath = '',
): Record<string, string[]> => {
  const grouped: Record<string, string[]> = {};

  for (const error of errors) {
    const field = parentPath ? `${parentPath}.${error.property}` : error.property;

    const messages = Object.keys(error.constraints ?? {}).map((constraint) =>
      translateConstraint(error, constraint, field, i18n),
    );

    if (messages.length > 0) {
      grouped[field] = messages;
    }

    if (error.children?.length) {
      Object.assign(grouped, groupErrors(error.children, i18n, field));
    }
  }

  return grouped;
};

export const i18nValidationExceptionFactory = (
  errors: ValidationError[],
): BadRequestException => {
  const i18n = I18nContext.current();

  if (!i18n) {
    return new BadRequestException('Validation failed');
  }

  return new BadRequestException({
    statusCode: 400,
    message: String(i18n.t(`${VALIDATION_PREFIX}.failed`, { lang: i18n.lang })),
    errors: groupErrors(errors, i18n),
  });
};
