import {
  WelcomeCard,
  WelcomeCardDesktop,
  WelcomCardDesktopProps,
} from "../../components/WelcomCard";
import { shallow } from "enzyme";
import illustration from "../../styles/img/undraw_gift1_sgf8.png";

describe.only("WelcomeCard components", () => {
  const WCDDesktopProps: WelcomCardDesktopProps = {
    illustration: illustration,
    subtitle: <>Hello</>,
    title: "Hi",
  };

  it("should render WelcomeCardDesktop correctly", () => {
    const wrapper = shallow(<WelcomeCardDesktop {...WCDDesktopProps} />);
    expect(wrapper.find("img").prop("src")).toEqual(illustration);
    expect(wrapper.find("div").at(2)).toHaveLength(1);
    expect(wrapper.find("h1").text()).toEqual(WCDDesktopProps.title);
  });

  it("should render WelcomeCard correctly", () => {
    const wrapper = shallow(
      <WelcomeCard welcomeCardDesktopProps={WCDDesktopProps} />
    );
    expect(wrapper.find("WelcomeCardDesktop")).toHaveLength(1);
  });
});
