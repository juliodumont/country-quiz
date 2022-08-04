import "./styles.css";

type Props = {
  title?: string;
  children: React.ReactNode;
  cardClass?: string;
  titleClass?: string;
};

export function BaseCard(props: Props) {
  return (
    <>
      {props.title && (
        <div className={`base-card-title-container ${props.titleClass}`}>
          <h1>{props.title}</h1>
        </div>
      )}
      <div className={`base-card-container ${props.cardClass}`}>{props.children}</div>
    </>
  );
}
