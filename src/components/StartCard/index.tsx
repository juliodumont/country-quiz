import { BaseCard } from "../../components/BaseCard";
import "./styles.css";

type Props = {
  title?: string;
  userMessage?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function StartCard(props: Props) {
  return (
    <BaseCard className="start-card" title={props.title}>
      {props.userMessage && (
        <div className="user-message">
          <h2>{props.userMessage}</h2>
        </div>
      )}
      <div>
        <div className="start-button-container">
          <button className="start-button" onClick={props.onClick}>
            Start
          </button>
        </div>
      </div>
    </BaseCard>
  );
}
