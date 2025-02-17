# fizzbuzz
# Built with Seahorse v0.2.0
#
# On-chain, persistent FizzBuzz!

from seahorse.prelude import *

# This is your program's public key and it will update
# automatically when you build the project.
declare_id('DXGoAPZDm6PPEH2Zr2paq2z98N2w8Pk88JJuqqhQoMBe')

### Accounts ###

class User(Account):
  owner: Pubkey  
  last_post_id: u64

class Post(Account):
  owner: Pubkey
  id: u64
  likes: u64
  title: str
  image: str

class Like(Account):
  post_owner: Pubkey
  post_id: u64
  liker: Pubkey

### Instructions ###

@instruction
def create_user(user: Empty[User], owner: Signer):
  # A wallet can only initialize one account
  user_account = user.init(
    payer = owner,
    seeds = ['user', owner]
  )
  user_account.owner = owner.key()
  print(owner.key(), 'created user account', user_account.key())
  
@instruction
def create_post(
  post: Empty[Post],
  user: User,
  owner: Signer,
  title: str,
  image: str,
  post_id: u64
):
  assert user.owner == owner.key(), "Incorrect owner"
  assert post_id == user.last_post_id + 1, "Incorrect post id"
  
  post_account = post.init(
    payer = owner,
    seeds = ['post', owner, post_id], # unable to use user.key()
    space = 8 + 32 + 8 + 4 + 128 + 4 + 256 # 440
  )
  user.last_post_id += 1
  post_account.owner = owner.key()
  post_account.title = title
  post_account.image = image
  post_account.id = user.last_post_id
  
  print(f'Post id: {post_id}, title: {post_account.title}, image: {post_account.image}')

  # Emit new post event
  new_post_event = NewPostEvent(post_account.owner, post_account.id)
  new_post_event.emit()

@instruction
def update_post(post: Post, owner: Signer, title: str):
  assert post.owner == owner.key(), "Incorrect owner"

  print('Old title:', post.title, 'new title:', title)

  post.title = title

  # Emit update post event
  update_post_event = UpdatePostEvent(post.owner, post.id)
  update_post_event.emit()

@instruction
def delete_post(post: Post, owner: Signer):
  assert post.owner == owner.key(), "Incorrect owner"

  # Close the post account by transfering the lamports to the owner
  post.transfer_lamports(owner, rent_exempt_lamports(440))

   # Emit delete post event
  delete_post_event = DeletePostEvent(post.owner, post.id)
  delete_post_event.emit()

@instruction
def like_post(like: Empty[Like], post: Post, user: User, liker: Signer):
  # Verify the user
  assert user.owner == liker.key(), "Incorrect liker"
  
  # Initialize a like account. Since this can only be called once per
  # (post, user), a user can only like a post once.
  like_account = like.init(
    payer = liker,
    seeds = ['like', post.owner, post.id, liker],
  )
  like_account.post_owner = post.owner
  like_account.post_id = post.id
  like_account.liker = liker.key()

  post.likes += 1
  print('Post id', post.id, 'by owner', post.owner, 'now has', post.likes, 'likes')

   # Emit like/dislike post event
  like_dislike_post_event = LikeDislikePostEvent(post.owner, post.id, post.likes)
  like_dislike_post_event.emit()

@instruction
def dislike_post(like: Like, post: Post, disliker: Signer):
  assert like.liker == disliker.key(), "Incorrect disliker"
  assert like.post_owner == post.owner, "Incorrect post owner"
  assert like.post_id == post.id, "Incorrect post id"
  
  # Close the like account by transfering the lamports to the owner
  like.transfer_lamports(disliker, rent_exempt_lamports(80))

  post.likes -= 1
  print('Post id', post.id, 'now has', post.likes, 'likes')

  # Emit like/dislike post event
  like_dislike_post_event = LikeDislikePostEvent(post.owner, post.id, post.likes)
  like_dislike_post_event.emit()

### Events ###
# NOTE: Not able to pass String values in events yet

class NewPostEvent(Event):
  owner: Pubkey
  id: u64

  def __init__(self, owner: Pubkey, id: u64):
    self.owner = owner
    self.id = id

class UpdatePostEvent(Event):
  owner: Pubkey
  id: u64

  def __init__(self, owner: Pubkey, id: u64):
    self.owner = owner
    self.id = id

class DeletePostEvent(Event):
  owner: Pubkey
  id: u64

  def __init__(self, owner: Pubkey, id: u64):
    self.owner = owner
    self.id = id

class LikeDislikePostEvent(Event):
  owner: Pubkey
  id: u64
  likes: u64

  def __init__(self, owner: Pubkey, id: u64, likes: u64):
    self.owner = owner
    self.id = id
    self.likes = likes
  
# Manually calculate rent exempt lamports from account size because
# we are not yet able to access lamports of an account from Seahorse.
def rent_exempt_lamports(size: u64) -> u64:
  return 897840 + 6960 * (size - 1)