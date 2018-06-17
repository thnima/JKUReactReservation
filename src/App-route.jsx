import React, {Component} from 'react';
import { Route } from 'react-router-dom';

class AppRoute extends Component {
    render(){
        const Layout = this.props.layout;
        const RenderedComponent = this.props.renderedComponent;
        const { renderedComponent, layout, auth, ...rest } = this.props;
        
        return (
            <Route
                {...rest}
                render={ props => (
                    <Layout auth={auth}>
                        <RenderedComponent {...props} auth={auth} />
                    </Layout>
                )}
            />
        );
    }
}

export default AppRoute;