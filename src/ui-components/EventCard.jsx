/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, TextAreaField, TextField } from "@aws-amplify/ui-react";
export default function EventCard(props) {
  const { model, overrides, ...rest } = props;
  return (
    <Flex
      gap="24px"
      direction="column"
      width="400px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      border="1px SOLID rgba(0,0,0,1)"
      borderRadius="25px"
      padding="23px 23px 23px 23px"
      backgroundColor="rgba(255,255,255,1)"
      defaultValue={model?.end}
      {...getOverrideProps(overrides, "EventCard")}
      {...rest}
    >
      <TextField
        width="unset"
        height="unset"
        label="Start"
        shrink="0"
        alignSelf="stretch"
        placeholder="Placeholder"
        size="default"
        isDisabled={true}
        labelHidden={false}
        variation="default"
        defaultValue={model?.start}
        {...getOverrideProps(overrides, "Start")}
      ></TextField>
      <TextField
        width="unset"
        height="unset"
        label="End"
        shrink="0"
        alignSelf="stretch"
        placeholder="Placeholder"
        size="default"
        isDisabled={true}
        labelHidden={false}
        variation="default"
        defaultValue={model?.end}
        {...getOverrideProps(overrides, "End")}
      ></TextField>
      <TextAreaField
        width="unset"
        height="unset"
        label="Name"
        shrink="0"
        alignSelf="stretch"
        placeholder="Placeholder"
        size="default"
        isDisabled={true}
        labelHidden={false}
        variation="default"
        defaultValue={model?.name}
        {...getOverrideProps(overrides, "Name")}
      ></TextAreaField>
      <Flex
        gap="24px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="flex-start"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Buttons")}
      >
        <Button
          width="unset"
          height="unset"
          shrink="0"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Update"
          {...getOverrideProps(overrides, "UpdateButton")}
        ></Button>
        <Button
          width="unset"
          height="unset"
          shrink="0"
          backgroundColor="rgba(191,64,64,1)"
          size="large"
          isDisabled={false}
          variation="primary"
          children="Delete"
          {...getOverrideProps(overrides, "DeleteButton")}
        ></Button>
      </Flex>
    </Flex>
  );
}
