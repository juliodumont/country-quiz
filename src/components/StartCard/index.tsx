import { BaseCard } from "../../components/BaseCard";
import "./styles.css";

type Props = {
  title?: string;
  userMessage?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onRegionSelect?: React.MouseEventHandler<HTMLButtonElement>;
};

export function StartCard(props: Props) {
  const regions = ["Americas", "Europe", "Asia", "Africa", "Oceania"];
  return (
    <BaseCard className="start-card" title={props.title}>
      <div className="quiz-image">
        <img src="./src/assets/images/undraw_adventure.svg" alt="Adventure" />
      </div>
      {props.userMessage && (
        <div className="user-message">
          <h2>{props.userMessage}</h2>
        </div>
      )}
      <div>
        <div className="start-button-container">
          <div className="regions-options-container">
            {regions.map((region) => {
              return (
                <div className="button-container" key={region}>
                  <button className="base-button-lg" onClick={props.onRegionSelect} name={region}>
                    {region}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="base-button-sm">
            <button onClick={props.onClick}>Start</button>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
