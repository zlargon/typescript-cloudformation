// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/pseudo-parameter-reference.html
const PseudoParameters = new Set([
  'AWS::AccountId',
  'AWS::NotificationARNs',
  'AWS::NoValue',
  'AWS::Partition',
  'AWS::Region',
  'AWS::StackId',
  'AWS::StackName',
  'AWS::URLSuffix',
]);

export interface SubValue {
  'Fn::Sub': string | [string, Record<string, unknown>];
}

// https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-sub.html
export const Fn_Sub = (stringTemplate: string, keyValuePair?: Record<string, unknown>): SubValue => {
  const params = stringTemplate.match(/\$\{[A-Za-z0-9:]+\}/g) ?? [];
  for (const paramWithBracket of params) {
    const param = paramWithBracket.slice(2, -1); // remove ${ and }

    // pseudo parameter
    if (param.includes(':')) {
      if (!PseudoParameters.has(param)) {
        const pseudoList = Array.from(PseudoParameters).join(', ');
        throw new Error(`Invalid pseudo parameter ${paramWithBracket}. Pseudo parameter should be: ${pseudoList}`);
      }
      continue;
    }

    // key value pair
    if (typeof keyValuePair === 'undefined' || !(param in keyValuePair)) {
      throw new Error(`Invalid parameter ${paramWithBracket}. It doesn't exist in the keyValuePair`);
    }
  }

  return {
    'Fn::Sub':
      typeof keyValuePair === 'undefined'
        ? stringTemplate //
        : [stringTemplate, keyValuePair],
  };
};