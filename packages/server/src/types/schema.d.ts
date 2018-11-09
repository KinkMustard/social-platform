// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
comments: Array<IComment>;
findListings: Array<IListing>;
searchListings: Array<IListing>;
viewListing: IListing | null;
messages: Array<IMessage>;
me: IUser | null;
viewUser: IUser | null;
}

interface ICommentsOnQueryArguments {
listingId: string;
}

interface ISearchListingsOnQueryArguments {
input?: ISearchListingsInput | null;
offset: number;
limit: number;
}

interface IViewListingOnQueryArguments {
id: string;
}

interface IMessagesOnQueryArguments {
listingId: string;
}

interface IViewUserOnQueryArguments {
username: string;
}

interface IComment {
__typename: "Comment";
id: string;
text: string;
datePosted: string;
listingId: string;
upvotes: number;
downvotes: number;
user: IUser;
}

interface IUser {
__typename: "User";
id: string;
email: string;
username: string;
upvoted: Array<string>;
downvoted: Array<string>;
}

interface IListing {
__typename: "Listing";
id: string;
name: string;
datePosted: string;
description: string;
upvotes: number;
downvotes: number;
pictureUrl: string | null;
owner: IUser;
}

interface ISearchListingsInput {
downvotes?: number | null;
upvotes?: number | null;
name?: string | null;
}

interface IMessage {
__typename: "Message";
text: string;
user: IUser;
listingId: string;
}

interface IMutation {
__typename: "Mutation";
createComment: boolean;
createListing: boolean;
deleteListing: boolean;
updateListing: boolean;
upvoteListing: boolean;
createMessage: boolean;
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError>;
login: ILoginResponse;
logout: boolean | null;
register: Array<IError>;
}

interface ICreateCommentOnMutationArguments {
comment: ICommentInput;
}

interface ICreateListingOnMutationArguments {
input: ICreateListingInput;
}

interface IDeleteListingOnMutationArguments {
id: string;
}

interface IUpdateListingOnMutationArguments {
listingId: string;
input: IUpdateListingInput;
}

interface IUpvoteListingOnMutationArguments {
listingId: string;
upvotes: number;
downvotes: number;
userId: string;
upvoted?: Array<string> | null;
downvoted?: Array<string> | null;
voteScenario: string;
voteTarget: string;
}

interface ICreateMessageOnMutationArguments {
message: IMessageInput;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
key: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
username: string;
password: string;
}

interface ICommentInput {
text: string;
listingId: string;
}

interface ICreateListingInput {
name: string;
picture?: any | null;
description: string;
upvotes: number;
downvotes: number;
}

interface IUpdateListingInput {
name?: string | null;
picture?: any | null;
pictureUrl?: string | null;
description?: string | null;
upvotes?: number | null;
downvotes?: number | null;
}

interface IMessageInput {
text: string;
listingId: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface ILoginResponse {
__typename: "LoginResponse";
errors: Array<IError>;
sessionId: string | null;
}

interface ISubscription {
__typename: "Subscription";
newMessage: IMessage;
}

interface INewMessageOnSubscriptionArguments {
listingId: string;
}
}

// tslint:enable
