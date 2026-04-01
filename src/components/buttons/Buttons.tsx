interface ButtonContent2Props {
  titleBtn?: string;
  linkBtn?: string;
  btnstyle?: string;
  gmbUrl?: boolean;
}

const ButtonContent: React.FC<ButtonContent2Props> = ({
  titleBtn,
  linkBtn,
  btnstyle,
  gmbUrl,
}) => {
  return (
    <div>
      <a
        href={`${linkBtn ? linkBtn : "/contact"} `}
        className="capitalize bookmarkBtn border-2 border-white"
        target={linkBtn && gmbUrl ? "_blank" : "_self"}
        aria-label={titleBtn ? titleBtn : "Contact Us!"}
      >
        <span className="IconContainer">
          <i className="fa fa-phone text-white"></i>
        </span>
        <p className="text ml-2 text-white">
          {titleBtn ? titleBtn : "Contact Us!"}
        </p>
      </a>
    </div>
  );
};
export default ButtonContent;
