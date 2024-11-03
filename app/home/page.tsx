import CardWrapper from '@/components/Card/CardWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { getCurrentSessionUserData } from '@/lib/actions/User';
import { CollectionData } from '@/types/types';
import Link from 'next/link';
import ActivityCard from './Components/ActivityCard';
import { getAllCollectionsSeenByUser, getMostPopularCollections } from '@/lib/actions/Collection';

const getRecentCollections = (collections: CollectionData[]) => {
  // I have come up with a better idea to get the recent collections. They will have an array of Users which they will be selected from so Lets say one user can have other users collections if they have played them.
  const date = new Date();
  date.setDate(date.getDate() - 7);

  return collections?.filter((collection) => {
    const createdAt = new Date(collection.createdAt);
    const updatedAt = new Date(collection.updatedAt);
    return createdAt >= date || updatedAt >= date;
  }).slice(0, 6);
};


const Page = async () => {
  const currentUserData = await getCurrentSessionUserData();

  // DONE
  const recentCollectionsSeenByUser = await getAllCollectionsSeenByUser()

  // These are the collections for the current user, we dont want that
  const collections = currentUserData?.collections;
  const classes = currentUserData?.classes;

  const mostPopularCollections = await getMostPopularCollections();
  
  return (
    <main className="flex flex-col gap-4 justify-start pb-24">
      <div className='mt-4'>
        <h1 className='text-3xl leading-tight'>Recent</h1>
          {recentCollectionsSeenByUser?.length > 0 ? (
            <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
              {recentCollectionsSeenByUser.map((collection) => (
                <Link href={`/collections/${collection.id}`} key={collection.id}>
                  <Card className="flex-1 bg-transparent shadow-none hover:bg-card">
                    <CardHeader>
                      <CardTitle className="text-xl leading-none -tracking-tight">{collection.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <small>Flashcard set *</small>
                      <small> {collection.flashcards?.length} terms * </small>
                      <small>{collection.userId === currentUserData?.id ? "by you" : `by ${collection.user.name}`}</small>
                    </CardContent>
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
        {classes?.map((classItem) => (
          <div key={classItem.id}>
            <h2>
              <strong>Class ID:</strong> {classItem.id}
            </h2>
          </div>
        ))}
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl'>Activities</h1>
        <div className='grid grid-col-1 lg:grid-cols-2 gap-4 mt-4'>
          <ActivityCard btnText='Create Collection' />
          <ActivityCard btnText='Create Class' />
        </div>
      </div>

      <div className='mt-24'>
        <h1 className='text-3xl leading-none'>Popular Collections</h1>
        <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
          {(await mostPopularCollections).map((collection, idx) => (
            <Link href={`/collections/${collection.id}`} key={collection.id}>
            <Card className="flex-1 bg-transparent shadow-none hover:bg-card">
              <CardHeader>
                <CardTitle className="text-xl leading-none -tracking-tight">{collection.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <small>Flashcard set *</small>
                <small> {collection.flashcards?.length} terms * </small>
                <small>{collection.popularity} popularity</small>
              </CardContent>
            </Card>
          </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;
