import xmas from "../styles/img/undraw_snow_globe_923j.png";

type WelcomCardDesktopProps = {
  illustration?: string;
  subtitle: JSX.Element;
  title: string;
};

type WelcomCardProps = {
  welcomeCardDesktopProps: {
    illustration?: string;
    subtitle: JSX.Element;
    title: string;
  };
};

const WelcomeCardDesktop = (props: WelcomCardDesktopProps) => {
  const { illustration, subtitle, title } = props;

  return (
    <div className="welcome-card-desktop">
      <div className="overlap-group">
        <img className="illustration" src={illustration} />
        <div className="subtitle lato-light-black">{subtitle}</div>
      </div>
      <h1 className="title castoro-regular-normal-black">{title}</h1>
    </div>
  );
};

export const WelcomeCard = (props: WelcomCardProps) => {
  const { welcomeCardDesktopProps } = props;

  return (
    <div className="welcome-tab-desktop">
      <WelcomeCardDesktop
        illustration={welcomeCardDesktopProps.illustration}
        subtitle={welcomeCardDesktopProps.subtitle}
        title={welcomeCardDesktopProps.title}
      />
    </div>
  );
};

const welcomeCardData = {
  illustration: xmas,
  subtitle: (
    <>
      Santa, Santa, please stop here.
      <br />
      Fill our your kids Christmas with joy and cheer!{" "}
    </>
  ),
  title: "Droppe Xmas",
};

export const WelcomeCardDesktopData = {
  welcomeCardDesktopProps: welcomeCardData,
};
