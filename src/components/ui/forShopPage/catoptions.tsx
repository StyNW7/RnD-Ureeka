// import React from 'react';

// const catoptions = () => {
//   return (
//     <div className="hidden lg:block">
//       <div className="container">
//         <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish my-5">
//             <a className="navbar-link relative" href="#">
//                 SIAMESE
//             </a>
//             <a className="navbar-link relative" href="#">
//                 BSH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 RAGDOLL
//             </a>
//             <a className="navbar-link relative" href="#">
//                 MUNCHKIN
//             </a>
//             <a className="navbar-link relative" href="#">
//                 ASH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 SCOTTISH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 BLH
//             </a>
//             <a className="navbar-link relative" href="#">
//                 ANIME
//             </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default catoptions;

import React from 'react';

const CatOptions = ({ setSelectedBreed }) => {
  return (
    <div className="hidden lg:block">
      <div className="container">
        <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish my-5">
          {["SIAMESE", "BSH", "RAGDOLL", "MUNCHKIN", "ASH", "SCOTTISH", "BLH", "ANIME"].map((breed) => (
            <a
              key={breed}
              className="navbar-link relative cursor-pointer"
              onClick={() => setSelectedBreed(breed)}
            >
              {breed}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatOptions;
