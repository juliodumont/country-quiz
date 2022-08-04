import "./styles.css";

type Props = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function BaseCard(props: Props) {
  return (
    <>
      {props.title && (
        <div className='base-card-title-container'>
          <h1>{props.title}</h1>
        </div>
      )}
      <div className={`base-card-container ${props.className}`}>{props.children}</div>
    </>
  );
}
