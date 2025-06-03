import type { BucketItem } from "@/app/_lib/bucket-items";
import { Badge, Table, Text, View, type BadgeProps } from "reshaped";
import { DeleteItem } from "../delete-item";
import { DownloadItem } from "../download-item";

export function Item({ item }: { item: BucketItem }) {
	return (
		<Table.Row>
			<Table.Cell verticalAlign="center">
				<Text maxLines={1}>{item.key}</Text>
			</Table.Cell>
			<Table.Cell align="end" width={30}>
				<View direction="row" gap={2} align={"end"} justify={"end"}>
					{item.status === "uploaded" ? (
						<>
							<DownloadItem item={item} />
							<DeleteItem item={item} />
						</>
					) : (
						<View paddingBlock={1.5}>
							<Badge color={badgeColor(item.status)} variant="faded">
								{item.status}
							</Badge>
						</View>
					)}
				</View>
			</Table.Cell>
		</Table.Row>
	);
}

function badgeColor(status: BucketItem["status"]): BadgeProps["color"] {
	switch (status) {
		case "uploaded":
			return "positive";
		case "uploading":
			return "warning";
		case "failed":
			return "critical";
	}
}
