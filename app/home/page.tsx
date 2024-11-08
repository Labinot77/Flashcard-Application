import { getAllUsers, getCurrentSessionUser, getCurrentSessionUserData } from '@/lib/actions/User';
import Link from 'next/link';
import ActivityCard from './Components/ActivityCard';
import { getAllCollectionsSeenByUser, getCollectionsLikedByUser, getMostPopularCollections } from '@/lib/actions/Collection';
import CreateClassCard from './Components/CreateClassCard';
import CardWrapper from '@/components/Card/CardWrapper';
import { FaUsers } from 'react-icons/fa';
import Recent from './Components/Recent';
import PopularCollections from './Components/PopularFlashcards';

const Page = async () => {
  const currentUserData = await getCurrentSessionUserData();
  const recentCollectionsSeenByUser = await getAllCollectionsSeenByUser();
  const likedCollections = await getCollectionsLikedByUser();
  const currentUser = await getCurrentSessionUser();

  const classes = currentUserData?.classUsers.slice(0, 6);
  const allUsers = await getAllUsers();
  const mostPopularCollections = await getMostPopularCollections();

  return (
    <main className="flex flex-col gap-4 justify-start pb-24">
      <div className='mt-4'>
        <h1 className='text-3xl leading-tight'>Recent</h1>
        {recentCollectionsSeenByUser?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
            {recentCollectionsSeenByUser.map((collection) => (
              <Recent collection={collection} currentUserData={currentUserData!} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full h-24'>
            <p className='text-center'>No collections found.</p>
            <small className='text-center'>Visit collections to see them</small>
          </div>
        )}
      </div>


      <div className='mt-14'>
        <h1 className='text-3xl'>Classes</h1>
        {classes && classes.length > 0 ? (
          <div className='grid grid-col-1 md:grid-cols-3 gap-4 mt-4'>
            {classes?.map((classItem) => (
              <Link href={`/classes/${classItem.class.id}`} key={classItem.class.id}>
                <CardWrapper className='w-full flex flex-col justify-center items-center bg-primary-foreground/20'>
                  <FaUsers className='h-10 w-10' />
                  <small>{classItem.class.classUsers.length} members</small>
                  <h1 className='text-xl'>{classItem.class.title}</h1>
                  <small>{classItem.class.description}</small>
                </CardWrapper>
              </Link>
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full h-24'>
            <p className='text-center'>No classes found.</p>
            <small className='text-center'>Join classes to see them</small>
          </div>
        )}
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl'>Activities</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
          <ActivityCard btnText='Create Collection' href='/collections/create' />
          <CreateClassCard users={allUsers} currentUser={currentUser!} />
        </div>
      </div>


      <div className='mt-24'>
        <h1 className='text-3xl leading-none '>Your Likes Collections</h1>
        {likedCollections && likedCollections?.length > 0 ? (
          <div className='grid grid-col-1 md:grid-cols-2 gap-4 mt-4'>
            {likedCollections?.map((collection) => (
              <Recent collection={collection} currentUserData={currentUserData!} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full h-24'>
            <p className='text-center'>No collections found.</p>
            <small className='text-center'>Engage with collections to see them</small>
          </div>
        )}
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl leading-none'>Popular Collections</h1>
        {mostPopularCollections?.length > 0 ? (
          <div className='grid grid-col-1 md:grid-cols-2 gap-4 mt-4'>
            {mostPopularCollections.map((collection) => (
              <PopularCollections collection={collection} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center w-full h-24'>
            <p className='text-center'>No collections found.</p>
            <small className='text-center'>Engage with collections to see them</small>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
