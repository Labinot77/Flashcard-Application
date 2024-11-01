import { getCurrentSessionUserData } from '@/lib/actions/User';

const Page = async () => {
  const currentUserData = await getCurrentSessionUserData();
  const collections = currentUserData?.collections;
  const classes = currentUserData?.classes

  return (
    <main className='flex flex-col gap-4 justify-start'>
      <div>
        <h1>Recent</h1>
        <div>
          {collections?.map((collection) => (
            <div key={collection.id}>
              <h2><strong>Collection ID:</strong> {collection.id}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h1>Classes</h1>
          {classes?.map((classItem) => (
            <div key={classItem.id}>
              <h2><strong>Class ID:</strong> {classItem.id}</h2>
            </div>
          ))}
      </div>

      <div>
        <h1>Activities</h1>
        <div>
          In this place I will put create collection and create class
        </div>
      </div>

      <div>
        <h1>Popular flashcard sets</h1>
        <div>
          In this place I will put popular flashcard sets, to be able to do that I have to add a new field to the collection so that I can store the popularity of the flashcard set
        </div>
      </div>
    </main>
  );
};

export default Page;
