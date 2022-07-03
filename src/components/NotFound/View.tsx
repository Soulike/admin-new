import notFoundImage from '@/src/static/404_page_not_found_1.svg';

import Style from './Style.module.scss';

export default function NotFound()
{
    return (
        <div className={Style.NotFound}>
            <img src={notFoundImage} alt="not-found" className={Style.image} />
        </div>
    );
}