import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllUsers, getCurrentSessionUser, getCurrentSessionUserData } from '@/lib/actions/User';
import Link from 'next/link';
import ActivityCard from './Components/ActivityCard';
import { getAllCollectionsSeenByUser, getCollectionsLikedByUser, getMostPopularCollections } from '@/lib/actions/Collection';
import { PiCardsLight } from "react-icons/pi";
import { LuDot } from "react-icons/lu";
import CreateClassCard from './Components/CreateClassCard';
import { auth } from '@/auth';
import CardWrapper from '@/components/Card/CardWrapper';
import { FaUsers } from 'react-icons/fa';
import DeleteModal from '@/components/Modals/DeleteModal';

const Page = async () => {

  const currentUserData = await getCurrentSessionUserData();
  const recentCollectionsSeenByUser = await getAllCollectionsSeenByUser()
  const likedCollections = await getCollectionsLikedByUser()
  const currentUser = await getCurrentSessionUser();


  // These are the collections for the current user, we dont want that
  const classes = currentUserData?.classUsers.slice(0, 6);
  const allUsers = await getAllUsers();

  const mostPopularCollections = await getMostPopularCollections();

  return (
    <main className="flex flex-col gap-4 justify-start pb-24">
      <div className='mt-4'>
        <h1 className='text-3xl leading-tight'>Recent</h1>
        {recentCollectionsSeenByUser?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4'>
            {recentCollectionsSeenByUser.map((collection) => (
              <Link href={`/collections/${collection.id}`} key={collection.id}>
                <Card className="p-2 flex gap-3 flex-1 bg-transparent shadow-none hover:bg-card">
                  <div className='bg-neutral-400 rounded-md p-2'>
                    <PiCardsLight className='h-7 w-7 text-white' />
                  </div>
                  <div className='flex flex-col justify-center items-start'>
                    <CardTitle className="text-base leading-none -tracking-tight">{collection.title}</CardTitle>
                    <ul className='flex'>
                      <li className='flex justify-center items-center'>
                        <LuDot />
                        {collection.flashcards?.length}

                      </li>
                      <small><LuDot /> {collection.userId === currentUserData?.id ? "by you" : `by ${collection.user.name}`}</small>

                    </ul>

                  </div>
                </Card>
              </Link>
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
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4'>
        {classes?.map((classItem) => (
          <Link href={`/classes/${classItem.class.id}`} key={classItem.class.id}>
          <CardWrapper className='w-full flex flex-col justify-center items-center bg-primary-foreground/20'>
              <FaUsers  className='h-10 w-10' />
              <small>{classItem.class.classUsers.length} members</small>
              <h1 className='text-xl'>{classItem.class.title}</h1>
              <small>{classItem.class.description}</small>
          </CardWrapper>
          </Link>
        ))}
        </div>
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl'>Activities</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4'>
          <ActivityCard btnText='Create Collection' href='/collections/create' />
          <CreateClassCard users={allUsers} currentUser={currentUser!} />
        </div>
      </div>


      <div className='mt-24'>
        <h1 className='text-3xl leading-none'>Your Likes Collections</h1>
        {likedCollections && likedCollections?.length > 0 ? (
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {likedCollections?.map((collection) => (
              <Link href={`/collections/${collection.id}`} key={collection.id}>
                <Card className="flex-1 bg-transparent shadow-none hover:bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl leading-none -tracking-tight">{collection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <small>Flashcard set *</small>
                    <small>{collection.flashcards?.length} terms * </small>
                    <small>{collection.userId === currentUserData?.id ? "by you" : `by ${collection.user.name}`}</small>
                    <small>{collection.likes.length} likes</small>
                  </CardContent>
                </Card>
              </Link>
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
          <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
            {mostPopularCollections.map((collection) => (
              <Link href={`/collections/${collection.id}`} key={collection.id}>
                <Card className="flex-1 bg-transparent shadow-none hover:bg-card">
                  <CardHeader>
                    <CardTitle className="text-xl leading-none -tracking-tight">{collection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <small>Flashcard set *</small>
                    <small>{collection.flashcards?.length} terms * </small>
                    <small>{collection.userId === currentUserData?.id ? "by you" : `by ${collection.user.name}`}</small>
                    <small>{collection.likes.length} likes</small>
                  </CardContent>
                </Card>
              </Link>
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
