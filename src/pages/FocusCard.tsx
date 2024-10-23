import { FocusCards } from "@/components/ui/focus-cards";

export default function FocusCardsDemo() {

  const cards = [
    {
      title: "Ashley",
      src: "/carousel-cats/ash/1.jpg",
    },
    {
      title: "Ansel",
      src: "/carousel-cats/ash/2.jpg",
    },
    {
      title: "Cyaa",
      src: "/carousel-cats/ash/3.jpg",
    },
    {
      title: "Woofey",
      src: "/carousel-cats/ash/4.jpg",
    },
    {
      title: "Nesser",
      src: "/carousel-cats/ash/5.jpg",
    },
    {
      title: "Lala",
      src: "/carousel-cats/ash/6.jpg",
    },
  ];

  return (
        <>
            <div className="flex justify-center align-middle mb-16">
                <h1 className="text-6xl font-bold">Cats of The Year!</h1>
            </div>
            <div className="mt-3 mb-16">
                <FocusCards cards={cards} />
            </div>
        </>
  );

}
