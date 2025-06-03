"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Button, Dismissible, Modal, Text, useToggle, View } from "reshaped";
import { deleteBucketItem } from "../_actions/bucket-items";
import type { BucketItem } from "../_lib/bucket-items";
import { useBucketItems } from "../_providers/bucket-items";

export function DeleteItem({ item }: { item: BucketItem }) {
	const { active, activate, deactivate } = useToggle(false);
	const [loading, setLoading] = useState(false);
	const { setItems } = useBucketItems();

	return (
		<>
			<Button icon={TrashIcon} onClick={activate} variant="outline" color="critical" />
			<Modal active={active} onClose={deactivate} onAfterClose={() => setLoading(false)}>
				<View gap={3}>
					<Dismissible onClose={deactivate} closeAriaLabel="Close modal">
						<Modal.Title>Delete Item</Modal.Title>
						<View gap={2} paddingBlock={2}>
							<Text>Do you want to delete the following file?</Text>
							<Text color="neutral-faded">{item.key}</Text>
						</View>
					</Dismissible>
					<Button
						color="critical"
						loading={loading}
						onClick={async () => {
							setLoading(true);
							setItems({
								kind: "remove",
								items: [item],
							});
							try {
								await deleteBucketItem(item);
								deactivate();
							} catch {
								setItems({
									kind: "add",
									items: [{ key: item.key, status: "failed" }],
								});
							}
						}}
					>
						Delete
					</Button>
				</View>
			</Modal>
		</>
	);
}
