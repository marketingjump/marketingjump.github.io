<?php

$fb = new Facebook\Facebook([
  'app_id' => '{app-id}',
  'app_secret' => '{app-secret}',
  'default_graph_version' => 'v2.2',
  ]);

// Since all the requests will be sent on behalf of the same user,
// we'll set the default fallback access token here.
$fb->setDefaultAccessToken('user-access-token');

/**
 * Generate some requests and then send them in a batch request.
 */

// Get the name of the logged in user
$requestUserName = $fb->request('GET', '/me?fields=id,name');

// Get user likes
$requestUserLikes = $fb->request('GET', '/me/likes?fields=id,name&amp;limit=1');

// Get user events
$requestUserEvents = $fb->request('GET', '/me/events?fields=id,name&amp;limit=2');

// Post a status update with reference to the user's name
$message = 'My name is {result=user-profile:$.name}.' . "\n\n";
$message .= 'I like this page: {result=user-likes:$.data.0.name}.' . "\n\n";
$message .= 'My next 2 events are {result=user-events:$.data.*.name}.';
$statusUpdate = ['message' => $message];
$requestPostToFeed = $fb->request('POST', '/me/feed', $statusUpdate);

// Get user photos
$requestUserPhotos = $fb->request('GET', '/me/photos?fields=id,source,name&amp;limit=2');

$batch = [
    'user-profile' => $requestUserName,
    'user-likes' => $requestUserLikes,
    'user-events' => $requestUserEvents,
    'post-to-feed' => $requestPostToFeed,
    'user-photos' => $requestUserPhotos,
    ];

echo '<h1>Make a batch request</h1>' . "\n\n";

try {
  $responses = $fb->sendBatchRequest($batch);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  // When Graph returns an error
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  // When validation fails or other local issues
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

foreach ($responses as $key => $response) {
  if ($response->isError()) {
    $e = $response->getThrownException();
    echo '<p>Error! Facebook SDK Said: ' . $e->getMessage() . "\n\n";
    echo '<p>Graph Said: ' . "\n\n";
    var_dump($e->getResponse());
  } else {
    echo "<p>(" . $key . ") HTTP status code: " . $response->getHttpStatusCode() . "<br />\n";
    echo "Response: " . $response->getBody() . "</p>\n\n";
    echo "<hr />\n\n";
  }
}

?>