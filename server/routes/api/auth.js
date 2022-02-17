// client initaties call to twitch auth
// it sends code to this route
// save it to the user model to check with auth middleware
// set a cookie on client, look at chatformer, google
// in all protected actions/calls, auth middeware checks the session cookie in req, uses some oauth library to check it to ensure its valid
