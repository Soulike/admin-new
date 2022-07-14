import {useLocation} from 'react-router-dom';

import {BlogFrameView} from './View';

export function BlogFrame() {
    const location = useLocation();

    return <BlogFrameView pathname={location.pathname} />;
}
