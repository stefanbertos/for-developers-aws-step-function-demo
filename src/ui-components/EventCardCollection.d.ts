/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { EventCardProps } from "./EventCard";
import { CollectionProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCardCollectionOverridesProps = {
    EventCardCollection?: PrimitiveOverrideProps<CollectionProps>;
    EventCard?: EventCardProps;
} & EscapeHatchProps;
export declare type EventCardCollectionProps = React.PropsWithChildren<Partial<CollectionProps<any>> & {
    items?: any[];
    overrideItems?: (collectionItem: {
        item: any;
        index: number;
    }) => EventCardProps;
} & {
    overrides?: EventCardCollectionOverridesProps | undefined | null;
}>;
export default function EventCardCollection(props: EventCardCollectionProps): React.ReactElement;
