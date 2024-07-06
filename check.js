const my_followers = [];
const not_following = [];

function processFollowers(followers_data) {
  followers_data.forEach((item) => {
    if (item.string_list_data && Array.isArray(item.string_list_data)) {
      item.string_list_data.forEach((subItem) => {
        if (subItem.value) {
          my_followers.push(subItem.value);
        }
      });
    }
  });
}

function processFollowing(following_data) {
    following_data['relationships_following'].forEach((item) => {
        if (item.string_list_data && Array.isArray(item.string_list_data)) {
          item.string_list_data.forEach((subItem) => {
            if (subItem.value && !my_followers.includes(subItem.value)) {
              not_following.push(subItem.value);
            }
          });
        }
      });
}

function readFiles() {
  const followers = document.getElementById("followers").files[0];
  const following = document.getElementById("following").files[0];

  if (followers && following) {
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e) {
      const content1 = e.target.result;
      const json1 = JSON.parse(content1);
      processFollowers(json1);
    };

    reader2.onload = function (e) {
      const content2 = e.target.result;
      const json2 = JSON.parse(content2);
      processFollowing(json2);
      document.getElementById('not-following').textContent = not_following.join('\n\n');
    };

    reader1.readAsText(followers);
    reader2.readAsText(following);
    document.getElementById('title').textContent = "Here's who's not following you back!!";
  } else {
    alert("Please select both JSON files.");
  }
}
