/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Event } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventCardOverridesProps = {
    EventCard?: PrimitiveOverrideProps<FlexProps>;
    Start?: PrimitiveOverrideProps<TextFieldProps>;
    End?: PrimitiveOverrideProps<TextFieldProps>;
    Name?: PrimitiveOverrideProps<TextAreaFieldProps>;
    Buttons?: PrimitiveOverrideProps<FlexProps>;
    UpdateButton?: PrimitiveOverrideProps<ButtonProps>;
    DeleteButton?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type EventCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    model?: Event;
} & {
    overrides?: EventCardOverridesProps | undefined | null;
}>;
export default function EventCard(props: EventCardProps): React.ReactElement;
