import './tab.scss';

import { TabContent, Tab, Tablink, TabNav } from './';

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  clickTab = (id) => {
    this.setState({
      id
    });
  };

  render() {
    const tabs = this.props.children
      .filter(child => child.type === Tab)
      .reduce((prev, next) => [...prev, ...next.props.children], []);

    const navList = tabs.filter(tab => tab.type === Tablink);
    const tabContents = tabs.filter(tab => tab.type === TabContent);

    return (
      <div className="tabs">
        <TabNav
          select={this.clickTab}
          activeIndex={this.state.id}
        >
          {navList}
        </TabNav>
        {tabContents[this.state.id]}
      </div>
    );
  }
}


/*  componentDidMount() {
    this.clickTab(0);
  }

  clickTab = (id) => {
    this.setState({
      content: this.props.tabs[id].content,
      id
    });
  };

  render() {
    return (
      <section className="tab">
        <TabNav
          list={
            this.props.tabs.map(({ id, title }) => ({ id, title }))
          }
          select={this.clickTab}
        />
        <TabContent content={this.state.content} />
      </section>
    );
  } */
