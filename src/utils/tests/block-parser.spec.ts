import { describe, vi, expect, it } from "vitest";

import { BlockParser } from "../blocks/block-parser";

// WP content of /post/i-have-finished-encryption-on-the-chat-app-and-what-a-journey-it-was/
const sample = `<h2 class="wp-block-heading">Table of Contents</h2>

<ul class="wp-block-list">
  <li class=""><a href="#introduction">Introduction</a></li>

  <li class=""><a href="#building-the-app">Building the app</a></li>

  <li class="">
    <a href="#architecting-persistance">Architecting Persistence</a>
  </li>

  <li class=""><a href="#encrypting-messages">Encrypting Messages</a></li>

  <li class=""><a href="#reading-messages-later">Reading Messages Later</a></li>

  <li class=""><a href="#storing-data-securely">Storing Data Securely</a></li>

  <li class=""><a href="#whats-next">What&#8217;s Next</a></li>
</ul>

<h2 class="wp-block-heading" id="introduction">Introduction</h2>

<p class="">
  When I first started this project, I said that it would involve e2e
  encryption. The basic requirements of it was that I would use web sockets,
  Elixir (specifically the Phoenix framework), Vue and use the Web Crypto API.
  I&#8217;d been asked by a friend a long time ago to help build a website with
  people able to create profiles and chatrooms. I thought I could do something,
  but as I planned it out, it became more and more obvious I didn&#8217;t have
  the time or tools. However, I have a problem: if I don&#8217;t know how to do
  something, I pursue every avenue to learn how to do it.
</p>

<p class="">
  I want to note, before I start, that I&#8217;m not a security expert.
  I&#8217;m certain that most of this is insecure and not a great architecture
  for encryption. But I wanted to try something new and give it a good shot.
</p>

<h2 class="wp-block-heading" id="building-the-app">Building the app</h2>

<p class="">
  When it came to making the actual chat app, that wasn&#8217;t particularly
  difficult. Wiring up the sockets was error-prone and tedious at times,
  especially since I hadn&#8217;t bothered to look into using Postman to test
  them out. I had to make lots of little changes as I went along, and each time
  I had to make sure the frontend and backend were coordinated on what data was
  provided each way. Also, the documentation for it wasn&#8217;t particularly
  good on either side. I&#8217;d like to contribute to the docs when I have the
  free time.
</p>

<p class="">
  As I knew from the beginning the difficult part was going to be the e2e
  encryption. It was the first thing I had researched before I began this
  project. I started to read books, ask advice from ChatGPT for advice and read
  articles online on things like the Signal protocol, on how other apps did such
  a thing. I learned that I needed a public key, a key that others could use to
  encrypt a message to send to you, and a private key, a key that only you would
  use to read a message. I&#8217;m not going to talk too much about them
  (because I don&#8217;t know that much!), so I suggest you do some research if
  you want to learn.
</p>

<p class="">
  When I discovered that browsers could handle most of the cryptography, I knew
  that there was a path forward. Just like authentication and its frequent use
  of password hashing, I didn&#8217;t have a clue about these complicated
  things. My study was in Italian, history and linguistics, not something like
  web security or cryptographic algorithms, but that&#8217;s the nice thing
  about programming: someone has probably solved your problem and made a version
  of it that abstracts away the part beyond your comprehension. TensorFlow and
  SciKit Learn do that with ML and statistics, and the WebCrypto Web API does
  that for encryption.
</p>

<p class="">
  If you&#8217;ve ever used TensorFlow or SciKitLearn, you know that if you
  don&#8217;t know what you&#8217;re doing, it quickly gets out of hand. The
  WebCrypto Web API has so many tools, but I just used what I could easily
  understand: I needed an algorithm to generate a public and private key so I
  could encrypt and decrypt text. For an MVP, I just wanted to be able to do the
  basics of e2e encryption in a one on one chat, and that didn&#8217;t seem so
  hard.
</p>

<h2 class="wp-block-heading" id="architecting-persistance">
  Architecting Persistence
</h2>

<p class="">
  All chat apps persist your messages. After all, I don&#8217;t send messages to
  my friend then they disappear as soon as I log out. They stay there so I can
  read a chat history. So all the messages need to be run by a server so they
  can be stored. I can store the encrypted messages so that&#8217;s not a
  problem. But also I would need to store the public and private keys so they
  can be restored when the user logs back in. Otherwise, the user would never be
  able to read the messages they sent ever again. I made a list of what were the
  needs of the application.
</p>

<ol class="wp-block-list">
  <li class="">Encrypt messages.</li>

  <li class="">Be able to read the messages at a later date.</li>

  <li class="">Storing data securely.</li>
</ol>

<h2 class="wp-block-heading" id="encrypting-messages">Encrypting Messages</h2>

<p class="">
  Encrypting the messages was to be done through the API I had discovered, so
  that was easy peasy. I found an article that recommended some parameters, so I
  didn&#8217;t need to do much thinking.
</p>

<div class="benyakir-syntax-highlighter">
  <pre style="display: none">
{"lang":"ts","code":"const ENCRYPTION_ALGORITHM = 'RSA-OAEP'\n\nconst keyGenParams: RsaHashedKeyGenParams = __L_CURLY_BRACKET__\n  name: ENCRYPTION_ALGORITHM,\n  modulusLength: 2048,\n  publicExponent: new Uint8Array([0x01, 0x00, 0x01]), \/\/ 65537 in little-endian format\n  hash: __L_CURLY_BRACKET__ name: 'SHA-256' __R_CURLY_BRACKET__,\n__R_CURLY_BRACKET__\n\nexport function generateKeys(): Promise__L_ANGLE_BRACKET__CryptoKeyPair__R_ANGLE_BRACKET__ __L_CURLY_BRACKET__\n  return crypto.subtle.generateKey(keyGenParams, true, ['encrypt', 'decrypt'])\n__R_CURLY_BRACKET__"}</pre
  >
</div>

<p class="">
  That&#8217;s all I had to do! It was so easy. There was a little bit of
  complication. To encrypt something, you must pass it in as a Uint8array. The
  difficulty was in changing a string to an array of their utf-8 encoded bytes.
  In almost all use cases, you will not need to do this in JavaScript or the
  frontend, but you often need to do manipulations like this on the backend. It
  means that you don&#8217;t learn how to do this for the most part. But the
  internet comes to the rescue: the <code>TextEncoder</code> class. Easy peasy!
</p>

<div class="benyakir-syntax-highlighter">
  <pre style="display: none">
{"lang":"ts","code":"  const encoder = new TextEncoder()\n  const encoded = encoder.encode(message)"}</pre
  >
</div>

<p class="">
  You could do it yourself, but essentially this will make an array, a real
  array with fixed length, not a vector that is a JavaScript array and store a
  numerical value for the string&#8217;s data in UTF-8 encoding (I could use
  other, but UTF-8 is the standard).
</p>

<p class="">
  Once that hurdle is cleared, the next one emerges: the encryption method
  returns an ArrayBuffer. And if we want to transmit the data over JSON, we
  can&#8217;t use an array buffer. We could transmit the values as an array of
  numbers, but I want to store this in a text field in my database. As I read on
  other sites and as I have had to do in the past, the easiest way to do this is
  to encode it in base 64. And the code for that isn&#8217;t too complicated
  either.
</p>

<div class="benyakir-syntax-highlighter">
  <pre style="display: none">
{"lang":"ts","code":"export function sidecodeArrayBufferAsBase64(buffer: ArrayBuffer): string __L_CURLY_BRACKET__\n  const uint8Array = new Uint8Array(buffer)\n  const charCodes = String.fromCharCode(...uint8Array)\n  return btoa(charCodes)\n__R_CURLY_BRACKET__"}</pre
  >
</div>

<p class="">
  Now I can send the data over JSON. When I receive it, I just do the opposite.
  It is a slightly annoying process, but it&#8217;s fairly simple. You live and
  you learn.
</p>

<h2 class="wp-block-heading" id="reading-messages-later">
  Reading Messages Later
</h2>

<p class="">
  Before I begin: I will talk about how I did things securely (I think) in the
  next section. This section will only talk about data persistence.
</p>

<p class="">
  This is the doozy, for multiple reasons. The first mental block I had to
  overcome is: how do I persist the keys so a user can read them later? If I
  were designing a mobile app, I have guaranteed (essentially) disk space to
  persist data and a SQLite database. But I&#8217;m making a web app, so I need
  to store the keys. I&#8217;ll discuss how I made them secure later, but this
  is where I did a lot of reading and head scratching. I could use a cookie (or
  series of them) which can be hidden, but that would mean that a user is tied
  to a specific browser and computer. Also, what happens if they clear cookies?
  They would never be able to read their messages again! Also never mind that
  you could have 10 conversations, and so you would need to store 10 private and
  10 public keys in cookies. And cookies cannot store much information in them.
  You could use local storage or the IndexedDB API, but neither of those are
  secure, and they have the same pitfalls about clearing your cache or switching
  device. The only solution was to store it in the database.
</p>

<p class="">
  With that problem solved, I happily added encryption between users in a
  private conversation (my app also allows group conversations). User A would
  encrypt their message with User B&#8217;s public key, send it to User B. Then
  User B would decrypt it with their public key. If you&#8217;ve already seen
  the problem, you are much smarter than I was a few days ago. The problem is
  that User A would no longer be able to understand their own message because
  they had encrypted it so only User B could read it. In a chat app, especially
  with my vaunted persistence, how could I solve that?
</p>

<p class="">
  I mentioned the Signal protocol above. When I first read it, I dismissed it as
  excessive. I didn&#8217;t want to go to al the work of implementing each user
  sending each message to each other user in a conversation, so e2e encryption
  would only work for private conversations. I wanted quick and easy MVP so I
  could show this off on my portfolio. I could slate encryption for group
  encryption for later. The signal protocol exactly solved my problem. I&#8217;m
  not smart, but I decided that my implementation would involve something called
  a <code>MessageGroup</code>, that acted as a middle man between a conversation
  and a message in the database. it would represent a message, but it would
  contain a message for each user in a conversation, depending on their public
  key.
</p>

<p class="">
  The scheme was this: when someone sent a message, they would take that same
  message, encrypt it for every public key in the conversation (including their
  own), then they would sent that to the server. All of those messages would go
  under the same <code>MessageGroup</code>. This added a little more
  complication: when a message is edited, all messages under that group has to
  be re-encrypted. And when I&#8217;m deleting a message, I have to delete the
  message group. Finally, when retrieving the messages from the database, I
  retrieve only one message per message group: the message for the person making
  the request. That way someone can read every message sent by them and to them,
  since there will always be a version stored that&#8217;s encrypted with their
  public key.
</p>

<p class="">
  It sounds so easy now that I type it up, but it was an enormous mental hurdle
  for me to get over. Once if figured it out, it wasn&#8217;t too difficult to
  implement in theory. The main complications, other than catching little
  problems, was because of the additional join now needed. It occurred in the
  three places mentioned above: 1. retrieving the messages, 2. sending the
  messages and 3. updating the messages. Deleting messages was easier to handle
  because if I deleted the message group, the delete would cascade to the
  individual messages.
</p>

<p class="">
  Messages were now paginated. I implemented that a month ago. During my day
  job, I had run into a similar problem: I want to paginate X resource, but I
  can only retrieve it after joining with Y data. For me, X was messages and Y
  was message groups. Here&#8217; the solution I came up with:
</p>

<div class="benyakir-syntax-highlighter">
  <pre style="display: none">
{"lang":"elixir","code":" def paginate_messages_query(conversation_id, user_id, opts \\\\ %__L_CURLY_BRACKET____R_CURLY_BRACKET__) do\n    page_size = Pagination.get_page_size(opts)\n\n    # We're usign this as a CTE instead of joins because we want to reuse\n    # the pagination logic in Pagination.add_seek_pagination\/2 and Pagination.paginate_from\/2\n    message_group_cte =\n      from(mg in MessageGroup,\n        where: mg.conversation_id == ^conversation_id\n      )\n\n    query =\n      Message\n      |__R_ANGLE_BRACKET__ with_cte(\"message_group\", as: ^message_group_cte)\n      |__R_ANGLE_BRACKET__ join(:inner, [m], mg in \"message_group\", on: m.message_group_id == mg.id)\n      |__R_ANGLE_BRACKET__ preload([m], [:message_group])\n      |__R_ANGLE_BRACKET__ where([m], m.recipient_user_id == ^user_id)\n      |__R_ANGLE_BRACKET__ Pagination.add_seek_pagination(page_size)\n      |__R_ANGLE_BRACKET__ Pagination.paginate_from(opts)\n\n    __L_CURLY_BRACKET__query, page_size__R_CURLY_BRACKET__\n  end"}</pre
  >
</div>

<p class="">
  The real difficulty was figuring out how to do it with Ecto since I
  didn&#8217;t want to have to change the pagination logic. I didn&#8217;t want
  to do it with raw SQL because then I would need to use each column to
  correlate with the correct data (which I had recently done with sqlalchemy).
  And the difficulty with Ecto, as noted in the comment, was figuring out how I
  could reuse the pagination logic. Using joins was pretty simple, and I think
  it would&#8217;ve easily solved this problem. But I wasn&#8217;t sure if it
  would mess with the pagination logic (I think I ran into some problems), so I
  used a CTE.
</p>

<p class="">
  With retrieval and pagination solved, the new problem was inserting the data.
  Since I&#8217;m inserting several messages under one message group, I should
  use <code>Repo.insert_all</code>, right? It makes sense. Well, there came to
  be a problem: I needed to retrieve each message with its message group because
  the client needed to know who the sender of the message was. I could encode
  the same sender on every message, but one of the rules of a SQL database club
  is this: you don&#8217;t repeat data unnecessarily.
</p>

<p class="">
  You might think: &#8220;but can&#8217;t you retrieve the message group after
  calling <code>Repo.insert_all</code>? That&#8217;s what I thought too, but no.
  You can&#8217;t. So instead I had to insert the records individually (Ecto at
  least handles that in one database transaction if you use
  <code>Ecto.Multi</code>) and prepopulate the <code>MessageGroup</code> as
  needed. For updates, it&#8217;s very similar. Except with inserts, you
  prepopulate before insertion, and with updates you do it after.
</p>

<h2 class="wp-block-heading" id="storing-data-securely">
  Storing Data Securely
</h2>

<p class="">
  Because I&#8217;m not a security expert, this is going to be brief. Messages
  are already encrypted when stored, so that wasn&#8217;t a problem. Storing the
  private and public keys securely, however, was a problem. How I got them into
  my database was because the WebCrypto API allows a public and private key to
  be exported to JSON. So I just added a table with those fields:
</p>

<div class="benyakir-syntax-highlighter">
  <pre style="display: none">
{"lang":"elixir","code":"create table(:encryption_keys) do\n      # Private keys do not a d, dp, dq, p, q or qi field.\n      # TODO: Consider if these should be two different tables.\n      add(:alg, :text, null: false)\n      add(:d, :binary)\n      add(:dp, :binary)\n      add(:dq, :binary)\n      add(:e, :binary, null: false)\n      add(:ext, :boolean, null: false)\n      add(:key_ops, __L_CURLY_BRACKET__:array, :text__R_CURLY_BRACKET__, null: false)\n      add(:kty, :text, null: false)\n      add(:n, :binary, null: false)\n      add(:p, :binary)\n      add(:q, :binary)\n      add(:qi, :binary)\n      add(:type, :text, null: false)\n\n      # This table has the foreign keys so we can cascade the delete.\n      add(:user_id, references(:users, type: :binary_id, on_delete: :delete_all), null: false)\n\n      add(:conversation_id, references(:conversations, type: :binary_id, on_delete: :delete_all),\n        null: false\n      )\n\n      timestamps()\n    end\n\n    create(index(:encryption_keys, [:type]))\n\n    # Between the constraint and the unique index, we can enforce that a user can only have a private and public key.\n    create(unique_index(:encryption_keys, [:user_id, :conversation_id, :type]))\n\n    create(\n      constraint(:encryption_keys, :public_or_private_type,\n        check: \"type = 'private' or type = 'public'\"\n      )\n    )"}</pre
  >
</div>

<p class="">
  Some of those fields are marked as optional. It turns out the algorithm I used
  uses all those fields, but only for private keys. A few of those fields are
  absent on public keys. I could&#8217;ve made two tables, but I figured it was
  fine.
</p>

<p class="">
  The other thing to note is that all the fields (minus a few) are marked as
  binary. That&#8217;s so I could use
  <a href="https://hexdocs.pm/cloak_ecto/readme.html">Cloak Ecto</a>. The most
  of the key&#8217;s fields are encrypted when they are stored in the database
  then decrypted every time they&#8217;re retrieved. It adds overhead, but this
  way, no one can see the public/private keys even if they access the database.
</p>

<h2 class="wp-block-heading" id="whats-next">What&#8217;s Next</h2>

<p class="">
  Now that this is done, I am ready to deploy the application. I have to update
  the documentation and make a few tweaks, but this should be deployed hopefully
  within the next week.
</p>

<p class="">
  There are a lot of features I would like to add, like socialization features,
  block lists, enhanced messages (such as images/videos), get email working
  correctly (for registering/changing passwords/password recovery/etc) and so
  much more. But those features will probably take awhile to implement since I
  don&#8217;t have a lot of extra time to work on this.
</p>
<div class="sharedaddy sd-sharing-enabled">
  <div
    class="robots-nocontent sd-block sd-social sd-social-icon-text sd-sharing"
  >
    <h3 class="sd-title">Share this:</h3>
    <div class="sd-content">
      <ul>
        <li class="share-facebook">
          <a
            rel="nofollow noopener noreferrer"
            data-shared="sharing-facebook-1289"
            class="share-facebook sd-button share-icon"
            href="/bblogs/bens-thoughts/i-have-finished-encryption-on-the-chat-app-and-what-a-journey-it-was/?share=facebook"
            target="_blank"
            title="Click to share on Facebook"
            ><span>Facebook</span></a
          >
        </li>
        <li class="share-x">
          <a
            rel="nofollow noopener noreferrer"
            data-shared="sharing-x-1289"
            class="share-x sd-button share-icon"
            href="/bblogs/bens-thoughts/i-have-finished-encryption-on-the-chat-app-and-what-a-journey-it-was/?share=x"
            target="_blank"
            title="Click to share on X"
            ><span>X</span></a
          >
        </li>
        <li class="share-end"></li>
      </ul>
    </div>
  </div>
</div>
`;

describe("BlockParser", () => {
	it("should parse", () => {
		const parser = new BlockParser(sample);
	});
});
