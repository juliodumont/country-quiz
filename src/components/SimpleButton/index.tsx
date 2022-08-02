import "./styles.css";

interface Props {
  color?: string;
  border?: string;
  radius?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  padding?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function SimpleButton(props: Props) {
  return (
    <button
      style={{
        color: props.color,
        backgroundColor: props.bgColor,
        width: props.width,
        height: props.height,
        border: props.border,
        padding: props.padding,
        borderRadius: props.radius
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

