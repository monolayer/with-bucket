"use server";

import documents from "@/workloads/documents";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { BucketItem } from "../_lib/bucket-items";
import { s3Client } from "../_lib/s3-client";

export async function deleteBucketItem(item: BucketItem) {
	await s3Client.send(
		new DeleteObjectCommand({
			Bucket: documents.name,
			Key: item.key,
		}),
	);
	return true;
}
