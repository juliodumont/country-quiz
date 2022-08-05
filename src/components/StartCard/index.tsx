import { BaseCard } from "../../components/BaseCard";
import "./styles.css";

type Props = {
  title?: string;
  userMessage?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onSelect?: React.MouseEventHandler<HTMLButtonElement>;
  options: string[];
  active: {};
  isLoading: boolean;
};

export function StartCard(props: Props) {
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
            {props.options.map((region) => {
              return (
                <div
                  className={`button-container disabled-${
                    props.active[
                      region.toLowerCase() as keyof typeof props.active
                    ]
                  }`}
                  key={region}
                >
                  <button
                    className="base-button-lg"
                    onClick={props.onSelect}
                    name={region}
                  >
                    {region}
                  </button>
                </div>
              );
            })}
          </div>
          {props.isLoading ? (
            <div className="base-button-sm">
              <button onClick={props.onClick} disabled>
                Aguarde...
              </button>
            </div>
          ) : (
            <div className="base-button-sm">
              <button onClick={props.onClick}>Start</button>
            </div>
          )}
        </div>
      </div>
    </BaseCard>
  );
}
