"use client";

import { use } from "react";
import { useBucketItems } from "../../_providers/bucket-items";
import { Item } from "./item";
import { NoItems } from "./no-items";

export function Items() {
	const context = useBucketItems();
	const items = use(context.items);
	return items.length === 0 ? (
		<NoItems />
	) : (
		items.map((item, idx) => <Item key={idx} item={item} />)
	);
}
