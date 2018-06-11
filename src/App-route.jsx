import React, {Component} from 'react';
import { Route } from 'react-router-dom';

class AppRoute extends Component {
    render(){
        const Layout = this.props.layout;
        const RenderedComponent = this.props.renderedComponent;
        const { renderedComponent, layout, ...rest } = this.props;
        
        return (
            <Route
                {...rest}
                render={ props => (
                    <Layout>
                        <RenderedComponent {...props} />
                    </Layout>
                )}
            />
        );
    }
}

export default AppRoute;