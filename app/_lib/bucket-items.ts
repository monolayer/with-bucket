import documents from "@/workloads/documents";
import { paginateListObjectsV2 } from "@aws-sdk/client-s3";
import { s3Client } from "./s3-client";

export interface BucketItem {
	key: string;
	status: "uploaded" | "uploading" | "failed";
}

export async function bucketItems() {
	const result = paginateListObjectsV2({ client: s3Client }, { Bucket: documents.name });
	const keys: BucketItem[] = [];

	for await (const page of result) {
		keys.push(
			...(page.Contents ?? [])
				.map((e) => e.Key)
				.filter((e) => e !== undefined)
				.map((e) => {
					return {
						key: e,
						status: "uploaded" as const,
					};
				})
				.sort(byNameASC),
		);
	}
	return keys;
}

export function byNameASC(a: BucketItem, b: BucketItem) {
	return a.key.toLowerCase().localeCompare(b.key.toLowerCase(), "en", {
		ignorePunctuation: true,
	});
}
