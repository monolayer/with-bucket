"use client";
import { byNameASC, type BucketItem } from "@/app/_lib/bucket-items";
import { createContext, startTransition, use, useReducer, type ReactNode } from "react";

export interface ItemAction {
	kind: "add" | "remove" | "replace";
	items: BucketItem[];
}

export type BucketItemsContext = {
	items: Promise<BucketItem[]>;
	setItems: (action: ItemAction) => void;
};

export const BucketItemsProvider = createContext<BucketItemsContext | null>(null);

export interface BucketItemsContextProviderProps {
	items: Promise<BucketItem[]>;
	children: ReactNode;
}

export default function BucketItemsContextProvider({
	items,
	children,
}: BucketItemsContextProviderProps) {
	const [state, dispatch] = useReducer(async (currentState, action: ItemAction) => {
		const awaitedItems = await currentState;
		const itemsKeys = action.items.map((item) => item.key);
		switch (action.kind) {
			case "add":
			case "replace":
				return sortedItems([
					...awaitedItems.filter((item) => !itemsKeys.includes(item.key)),
					...action.items,
				]);
			case "remove":
				return sortedItems(awaitedItems.filter((item) => !itemsKeys.includes(item.key)));
		}
	}, items);

	const setItems = (action: ItemAction) => {
		startTransition(() => dispatch(action));
	};
	return (
		<BucketItemsProvider.Provider value={{ items: state, setItems }}>
			{children}
		</BucketItemsProvider.Provider>
	);
}

function sortedItems(items: BucketItem[]) {
	return items.sort(byNameASC);
}
export function useBucketItems() {
	const context = use(BucketItemsProvider);
	if (!context) {
		throw new Error("useBucketItems must be used within a <BucketItemsProvider />");
	}
	return context;
}
