/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import EventCard from "./EventCard";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Collection } from "@aws-amplify/ui-react";
export default function EventCardCollection(props) {
  const { items, overrideItems, overrides, ...rest } = props;
  return (
    <Collection
      type="grid"
      searchPlaceholder="Search..."
      templateColumns="1fr 1fr 1fr 1fr"
      autoFlow="row"
      alignItems="stretch"
      justifyContent="stretch"
      items={items || []}
      {...getOverrideProps(overrides, "EventCardCollection")}
      {...rest}
    >
      {(item, index) => (
        <EventCard
          height="auto"
          width="auto"
          margin="0 5px 0 0"
          key={item.id}
          {...(overrideItems && overrideItems({ item, index }))}
        ></EventCard>
      )}
    </Collection>
  );
}
