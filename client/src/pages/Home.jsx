import SearchBox from '../components/SearchBox'
import EssayForm from '../components/EssayForm';
import LessonGenerator from '../components/LessonPage';
import UserDashboard from '../components/Dashboard';
import ContentExplorer from '../components/ContentExplorer';

const Home = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="md:col-span-2 lg:col-span-2">
                <SearchBox />
            </div>
            <div className="md:col-span-1 lg:col-span-1">
                <EssayForm />
            </div>
            <div className="md:col-span-1 lg:col-span-1">
                <LessonGenerator/>
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <UserDashboard />
            </div>
            <div className="md:col-span-2 lg:col-span-2">
                <ContentExplorer/>
            </div>
        </div>
    );
};

export default Home;