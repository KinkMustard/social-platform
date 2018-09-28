// import * as React from "react";
// import { Button } from "antd";

// interface Props {
//   userId: string;
//   upvoted: string[];
//   downvoted: string[];

//   listingId: string;
//   listingUpvotes: number;
//   listingDownvotes: number;
// }
// export class VoteButton extends React.PureComponent<Props> {
//   render() {
//     const {
//       userId,
//       upvoted,
//       downvoted,
//       listingId,
//       listingUpvotes,
//       listingDownvotes
//     } = this.props;
//     return (
//       <Button
//         shape="circle"
//         icon="up"
//         size="large"
//         style={
//           upvoted.includes(listingId)
//             ? {
//               margin: "auto",
//               display: "block",
//               marginTop: 20,
//               backgroundColor: "#69c0ff"
//             }
//             : {
//               margin: "auto",
//               display: "block",
//               marginTop: 20,
//               backgroundColor: "#e6f7ff"
//             }
//         }
//         onClick={async () => {
//           if (
//             !data.me.upvoted.includes(l.id) &&
//             data.me.downvoted.includes(l.id)
//           ) {
//             let tempUpvotes = l.upvotes;
//             tempUpvotes++;
//             let tempDownvotes = l.downvotes;
//             tempDownvotes--;
//             const result = await upvoteListing({
//               variables: {
//                 listingId: l.id,
//                 upvotes: tempUpvotes,
//                 downvotes: tempDownvotes,
//                 userId: data.me.id,
//                 upvoted: data.me.upvoted,
//                 downvoted: data.me.downvoted,
//                 voteScenario: "upvote-while-downvoted"
//               }
//             });
//             console.log("result", result);
//             refetch();
//             refetchListings();
//           } else if (!data.me.upvoted.includes(l.id)) {
//             let temp = l.upvotes;
//             temp++;
//             const result = await upvoteListing({
//               variables: {
//                 listingId: l.id,
//                 upvotes: temp,
//                 downvotes: l.downvotes,
//                 userId: data.me.id,
//                 upvoted: data.me.upvoted,
//                 downvoted: data.me.downvoted,
//                 voteScenario: "upvote"
//               }
//             });
//             console.log("result", result);
//             refetch();
//             refetchListings();
//           } else if (data.me.upvoted.includes(l.id)) {
//             let temp = l.upvotes;
//             temp--;
//             const result = await upvoteListing({
//               variables: {
//                 listingId: l.id,
//                 upvotes: temp,
//                 downvotes: l.downvotes,
//                 userId: data.me.id,
//                 upvoted: data.me.upvoted,
//                 downvoted: data.me.downvoted,
//                 voteScenario: "deupvote"
//               }
//             });
//             console.log("result", result);
//             refetch();
//             refetchListings();
//           }
//         }}
//       />
//     );
//   }
// }
