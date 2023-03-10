import { DynamoDB_Table } from './DynamoDB_Table.ts';
import { EC2_Instance } from './EC2_Instance.ts';
import { EC2_InternetGateway } from './EC2_InternetGateway.ts';
import { EC2_Route } from './EC2_Route.ts';
import { EC2_RouteTable } from './EC2_RouteTable.ts';
import { EC2_SecurityGroup } from './EC2_SecurityGroup.ts';
import { EC2_Subnet } from './EC2_Subnet.ts';
import { EC2_SubnetRouteTableAssociation } from './EC2_SubnetRouteTableAssociation.ts';
import { EC2_Volume } from './EC2_Volume.ts';
import { EC2_VolumeAttachment } from './EC2_VolumeAttachment.ts';
import { EC2_VPC } from './EC2_VPC.ts';
import { EC2_VPCGatewayAttachment } from './EC2_VPCGatewayAttachment.ts';
import { RDS_DBInstance } from './RDS_DBInstance.ts';
import { RDS_DBSubnetGroup } from './RDS_DBSubnetGroup.ts';
import { S3_Bucket } from './S3_Bucket.ts';
import { SNS_Topic } from './SNS_Topic.ts';
import { SQS_Queue } from './SQS_Queue.ts';

export type Resource =
  | DynamoDB_Table //
  | RDS_DBInstance
  | RDS_DBSubnetGroup
  | SQS_Queue
  | SNS_Topic
  | EC2_Instance
  | EC2_InternetGateway
  | EC2_Route
  | EC2_RouteTable
  | EC2_SecurityGroup
  | EC2_Subnet
  | EC2_SubnetRouteTableAssociation
  | EC2_Volume
  | EC2_VolumeAttachment
  | EC2_VPC
  | EC2_VPCGatewayAttachment
  | S3_Bucket;
