interface RIProps {
  src: string;
  bonus_classes?: string;
}

interface Props {
  info: {
    category: number;
    colour_scheme: string;
    created_at: string;
    description: string;
    front_image: string;
    id: number;
    likes: number;
    title: string;
  };
  _key?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  picture?: boolean;
}

const RectangularImage = ({ src, bonus_classes }: RIProps) => {
  const base_classes =
    bonus_classes +
    " bg-white active:bg-slate-300 w-[400px] rounded-lg p-3 m-5 shadow-md  hover:scale-[102%] transition-transform ";

  return <img src={src} className={base_classes} />;
};

//A round image with a background. Increases in opacity and size slightly on hover
const Post = ({ info, _key, onClick, picture = true }: Props) => {
  return (
    <button className="m-3" key={_key} onClick={onClick}>
      {picture && (
        <div className="flex justify-center">
          <RectangularImage src={info.front_image} />
        </div>
      )}
      <div className="flex justify-center">
        <p className="w-full h-full small-text-bg hover:scale-100 hover:shadow-lg text-wrap">
          {info.title}
        </p>
      </div>
    </button>
  );
};

export default Post;
