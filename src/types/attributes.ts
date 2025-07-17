export type AttributeValueProps = {
  id: string;
  attribute_id: string;
  value: string;
  attribute?: AttributeProps;
};

export type AttributeProps = {
  id: string;
  name: string;
};
