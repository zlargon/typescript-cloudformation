#!/usr/bin/env -S deno run
import { PseudoParameter } from '../src/PseudoParameter.ts';
import { createStack } from '../src/Stack.ts';
import { NameTagSub } from '../src/Tag.ts';

const stack = createStack({
  Description: `
Section 7 Activity template.
This template creates an EC2 instance and an EBS volume attached to it.`,
});

// ==============================================
// Parameters
// ==============================================
const WebServerSubnet = stack.addParameter('WebServerSubnet', {
  Type: 'AWS::EC2::Subnet::Id',
  Description: 'The subnet of the web server instance.',
});

// ==============================================
// Mappings
// ==============================================
const Fn_FindInRegionImageMap = stack.addMapping('RegionImages', {
  'eu-west-1': { ImageId: 'ami-0fe0b2cf0e1f25c8a' },
  'us-east-1': { ImageId: 'ami-0b5eea76982371e91' },
});

// ==============================================
// Resources
// ==============================================
const WebServerInstance = stack.addResource('WebServerInstance', {
  Type: 'AWS::EC2::Instance',
  Properties: {
    InstanceType: 't2.micro',
    SubnetId: WebServerSubnet.Ref(),
    ImageId: Fn_FindInRegionImageMap(PseudoParameter.Region.Ref(), 'ImageId'),
    Tags: [NameTagSub('${AWS::StackName}-WebServer')],
  },
});

stack.addResource('EbsVolume', {
  Type: 'AWS::EC2::Volume',
  Properties: {
    AvailabilityZone: WebServerInstance.Attr('AvailabilityZone'),
    VolumeType: 'gp2',
    Size: 10,
    Tags: [NameTagSub('${AWS::StackName}-Volume')],
  },
});

console.log(stack.json());
