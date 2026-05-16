// src/data/ecosystems.js
// Narrative strings for The Looking Glass Market.
// Variable tokens: {TICKER}, {CHANGE}, {PRICE}, {DAYS}
// String rotation is sequential (index 0→1→2→0), not random.
// Inversion strings have no tokens — fixed, present-tense, 30-second display.
//
// Each state has two string sets:
//   creature  — leads with the animal's emotional state (used on creature path)
//   environment — leads with the world's condition (used on environment path)
//
// CREATURE/ASSET MAP (Ultimate Animated Animals pack, glTF files):
// arctic_tundra      → Husky.gltf
// boreal_forest      → Wolf.gltf
// temperate_woodland → Stag.gltf
// woodland_edge      → Fox.gltf
// open_grassland     → Horse.gltf
// andean_highland    → Alpaca.gltf
// arid_scrubland     → Donkey.gltf

export const ECOSYSTEMS = {
  arctic_tundra: {
    id: 'arctic_tundra',
    environment: 'Arctic Tundra',
    creature: 'Husky',
    asset: 'Husky.gltf',
    strings: {
      creature: {
        flourishing: [
          "The husky is running flat out — not because anything is chasing it, just because the ice is perfect and it knows it. {TICKER} up {CHANGE}. It doesn't want to stop.",
          "She's barely tired after {DAYS} days of this. The cold is exactly right and the ground gives her everything. She keeps going.",
          "He found a route he's never run before and took it at full speed. {TICKER} up {CHANGE} this week. At the end he turned around and ran it again.",
        ],
        stable: [
          "She's comfortable today. Nothing pulling at her, nothing missing. {TICKER} at {PRICE}. The rhythm is easy and she keeps it.",
          "The husky does what it always does — eats, runs, rests. {CHANGE} this week. The tundra holds its end of the deal.",
          "He knows this ground. {CHANGE} this month. He moves through it without thinking. That's not nothing.",
        ],
        uneasy: [
          "She stopped halfway through her usual run and just stood there for a while. {TICKER} {CHANGE}. Something felt different. She couldn't name it. She kept going eventually.",
          "He's been checking the air more than usual. {CHANGE}. The scent is almost right. He just needs it to be all the way right.",
          "She ate but didn't finish. {TICKER} {CHANGE}. Nothing's wrong exactly. She just has that feeling — something has shifted.",
        ],
        stressed: [
          "He's working harder than he should be for the distance he's covering. {TICKER} {CHANGE}. The ground isn't giving back what it used to. He goes anyway.",
          "She's pushed herself the last {DAYS} days and her eyes show it. {CHANGE} this week. Still running, still eating — but the tired doesn't go away with rest.",
          "He makes it back every time. {TICKER} {CHANGE}. But it costs more now. He sits a long time at the end of the run and it doesn't look like resting.",
        ],
        crisis: [
          "She is standing very still at the edge of where the ice used to be. {TICKER} {CHANGE}. Her tail is down. She doesn't know where to go from here.",
          "He hasn't run today. {CHANGE} this month. He's sitting in the middle of the tundra, looking at something we can't see. He looks okay. He doesn't look okay.",
          "She made it back. {TICKER} down {CHANGE}. She always makes it back. She curled up without eating and has been still for {DAYS} days.",
        ],
      },
      environment: {
        flourishing: [
          "The tundra is frozen solid and wide open, as far as the eye can see. {TICKER} up {CHANGE}. The husky moves across it like it was made for this — because it was.",
          "Everything is locked in and bright. {CHANGE} this week. The husky has eaten well and slept deep and is awake and ready. The ice holds.",
          "The Arctic is giving its best right now — clean air, firm ground, long light. {TICKER} up {CHANGE}. The husky feels every bit of it.",
        ],
        stable: [
          "The tundra is calm today. Not exciting, not worrying — just the tundra doing what it does. {CHANGE} this week. The husky moves through it like always.",
          "The ice is the right depth. The cold is the right cold. {TICKER} at {PRICE}. The husky is where it belongs.",
          "Everything is in its usual place. {CHANGE} this month. The husky eats and rests and runs. The tundra holds.",
        ],
        uneasy: [
          "The wind has changed direction. {TICKER} {CHANGE}. The tundra looks the same but the husky is paying attention to it differently today.",
          "The ice sounds different underfoot. {CHANGE}. Not alarming — just different. The husky has slowed its pace, without really deciding to.",
          "Something in the air has been different for {DAYS} days. {TICKER} {CHANGE}. The tundra is still there. The husky is just listening harder.",
        ],
        stressed: [
          "The tundra is working against it. The ice has softened at the edges, unreliable now. {TICKER} {CHANGE}. The husky tests each step before taking it.",
          "The cold has turned wrong — wet instead of dry. {CHANGE} this week. The husky's coat is damp and heavy. It keeps moving because it doesn't know another way.",
          "The firm ground that used to be everywhere isn't anymore. {TICKER} {CHANGE}. The husky has been routing around the soft patches for {DAYS} days.",
        ],
        crisis: [
          "The ice is gone. What was solid ground is open water now. {TICKER} {CHANGE}. The husky stands at the edge and does not cross.",
          "The tundra has lost its surface. {CHANGE} this month. The husky moves slowly through what's left, head low, testing every step.",
          "Everything the tundra promised has disappeared. {TICKER} down {CHANGE}. The husky is still here, because it doesn't know what else to do.",
        ],
      },
      inversion: "The tundra freezes all at once — the soft ground, the open water, the warm patches — everything locks into a surface harder and cleaner than the husky has ever run on. It runs full speed in every direction. For thirty seconds there is no edge, no breaking point, no water underneath. Then the thaw resumes.",
    },
  },

  boreal_forest: {
    id: 'boreal_forest',
    environment: 'Boreal Forest',
    creature: 'Wolf',
    asset: 'Wolf.gltf',
    strings: {
      creature: {
        flourishing: [
          "The wolf ate yesterday, the day before, and will eat again today. {TICKER} up {CHANGE}. It runs the territory just to feel how fast it is right now.",
          "She's been howling at nothing — just because she can, because the pack is full and there is room for it. {CHANGE} this week. It feels good.",
          "He's playing. Actually playing, chasing things he doesn't need to catch. {TICKER} up {CHANGE} this month. The pack watches from a ridge. He doesn't tire.",
        ],
        stable: [
          "The wolf ate last night and will eat again tomorrow. {CHANGE} this week. Not happy, not worried — just the wolf, doing what the wolf does.",
          "She made her rounds. Everything was where she left it. {TICKER} at {PRICE}. She went back to the pack. They're fine.",
          "He hunted, he rested. The forest cooperated. {CHANGE} this month. That's the whole of it.",
        ],
        uneasy: [
          "She made the kill but didn't eat much. {TICKER} {CHANGE}. She kept looking up. The forest was quiet in the kind of way that means something.",
          "He tracked for {DAYS} hours and came back with less than he expected. {CHANGE}. He's not alarmed. He's paying attention.",
          "She howled and the answer came from further away than it should have. {TICKER} {CHANGE}. She went back to sleep but not all the way.",
        ],
        stressed: [
          "He's running twice as far for half the reward. {TICKER} {CHANGE}. He's not failing — he's just spending more of himself than the forest is giving back.",
          "She hunted hard all day. It wasn't enough. {CHANGE} this week. She's okay. She's just tired in a way that rest doesn't fully fix.",
          "The pack is drifting apart and he's been working to hold them together for {DAYS} days. {TICKER} {CHANGE}. He's managing. Just.",
        ],
        crisis: [
          "The wolf stands at the center of its territory and howls. {TICKER} {CHANGE}. Nothing answers. It howls again.",
          "She ate {DAYS} days ago. {CHANGE} this month. She's still moving, still hunting. She just looks like an animal that knows things are hard.",
          "He found the pack scattered across the far edge of the range. {TICKER} down {CHANGE}. He sat with each of them. None of them had anything to offer. He stayed anyway.",
        ],
      },
      environment: {
        flourishing: [
          "The boreal forest is full of sound and movement. {TICKER} up {CHANGE}. The wolf moves through it like it belongs to everything it touches.",
          "The prey is everywhere. The wolf doesn't have to work for it. {CHANGE} this week. The forest is giving freely and the pack is well.",
          "Every part of the forest is awake and alive. {TICKER} up {CHANGE} this month. The wolf runs its full range and finds it rich at every point.",
        ],
        stable: [
          "The boreal forest is as it always is. {CHANGE} this week. The wolf moves through it in its patterns and the forest holds its shape.",
          "The prey is in its usual range. {TICKER} at {PRICE}. The wolf is in its usual range. Everything keeps its territory today.",
          "Nothing has changed. {CHANGE} this month. The wolf knows where everything is. That is enough.",
        ],
        uneasy: [
          "The elk have shifted their range. {TICKER} {CHANGE}. The wolf is still finding food — just not where it used to.",
          "Something in the forest has changed direction. {CHANGE}. Subtle enough that you'd miss it. The wolf hasn't.",
          "The boreal forest is quieter than usual. {TICKER} {CHANGE}. The wolf has been moving differently for {DAYS} days. Not worried. Just alert.",
        ],
        stressed: [
          "The forest is thinning where it used to be thick. {TICKER} {CHANGE}. The wolf covers more ground for smaller returns. It keeps going.",
          "The prey has scattered to the margins. {CHANGE} this week. The wolf works the territory methodically, finding less in more places.",
          "Something has gone out of the boreal forest. {TICKER} {CHANGE}. The wolf feels it without understanding it. It hunts anyway.",
        ],
        crisis: [
          "The forest is quiet in the way that means the prey is gone. {TICKER} {CHANGE}. The wolf moves through it anyway. The trees are still there.",
          "Everything that made this good hunting has disappeared. {CHANGE} this month. The wolf hasn't stopped. It just has less to show.",
          "The boreal forest has nothing left to give right now. {TICKER} down {CHANGE}. The wolf has waited this out before. It waits.",
        ],
      },
      inversion: "The forest fills with sound all at once — elk, deer, everything that was gone returning in a single night. The wolf hunts before it has time to understand what it's hunting. The pack reassembles from different directions. For thirty seconds the territory is whole and loud and full. Then the silence begins its return.",
    },
  },

  temperate_woodland: {
    id: 'temperate_woodland',
    environment: 'Temperate Woodland',
    creature: 'Stag',
    asset: 'Stag.gltf',
    strings: {
      creature: {
        flourishing: [
          "The stag is moving through the woodland with his head up, antlers catching the light. {TICKER} up {CHANGE}. He doesn't lower them for anything today.",
          "He keeps returning to the same clearing — not from hunger, just from something like happiness. {CHANGE} this week. The browse is deep and it's good.",
          "His antlers have grown past the branches he used to clear easily. {TICKER} up {CHANGE} this month. He keeps walking into them. He keeps choosing the same path anyway.",
        ],
        stable: [
          "The stag moves through his range with the quiet authority of something that has always been here. {CHANGE} this week. Nothing asks more of him today.",
          "He eats in the morning and rests in the afternoon. {TICKER} at {PRICE}. The woodland accommodates both. He doesn't think about it.",
          "She's neither dominant nor challenged right now. {CHANGE} this month. She moves through the woodland and the woodland lets her.",
        ],
        uneasy: [
          "The stag drifted west this morning without deciding to. {TICKER} {CHANGE}. A younger animal had come near. No confrontation — just a slow drift away.",
          "He's eating more than usual but it tastes different. {CHANGE}. He keeps eating. He keeps tasting it. He can't name what changed.",
          "She's taking longer routes through the cover that's still thick. {TICKER} {CHANGE}. The understorey has been thinning for {DAYS} days and she knows it.",
        ],
        stressed: [
          "He's been challenged twice in {DAYS} days and won both. {TICKER} {CHANGE}. He feels less certain than he did before he won.",
          "She's taking longer routes through the remaining cover, adding time she doesn't want to add. {CHANGE} this week. She does it anyway.",
          "The browse is retreating to the edges. {TICKER} {CHANGE}. The stag follows it and finds himself near the treeline more than he wants to be.",
        ],
        crisis: [
          "The stag is standing at the treeline, looking out at open land. {TICKER} {CHANGE}. It was not built for what's out there. It hasn't moved.",
          "His antlers caught in what's left of the canopy twice this morning. {CHANGE} this month. He backed out each time. The woodland isn't the right size for him anymore.",
          "She's been still for {DAYS} days at the edge of the trees. {TICKER} down {CHANGE}. Beyond the treeline is open ground she has no map for.",
        ],
      },
      environment: {
        flourishing: [
          "The woodland is in full growth — canopy closed, browse deep, light coming through warm and gold. {TICKER} up {CHANGE}. The stag moves through it like it was made for him.",
          "The temperate woodland is giving everything right now. {CHANGE} this week. The stag has eaten well before the other animals reach the good growth.",
          "The trees are heavy with new life. {TICKER} up {CHANGE} this month. The stag is unhurried and at ease. The forest holds everything it should.",
        ],
        stable: [
          "The woodland holds its season. {CHANGE} this week. The stag follows the trails it knows and they hold.",
          "The browse is where it always is. {TICKER} at {PRICE}. The forest is neither generous nor withholding today.",
          "Everything in the temperate woodland is in its usual place. {CHANGE} this month. The stag eats and rests. The forest continues.",
        ],
        uneasy: [
          "The understorey has thinned on the eastern side. {TICKER} {CHANGE}. The stag moves with slightly less cover and has noticed.",
          "The canopy isn't as full as it was {DAYS} days ago. {CHANGE}. The woodland is still there — just offering a little less shade.",
          "Something in the woodland has shifted. {TICKER} {CHANGE}. The stag is following the same trails but paying more attention to them.",
        ],
        stressed: [
          "The woodland canopy is opening up in places it didn't used to. {TICKER} {CHANGE}. The stag is exposed in the afternoon light and is taking longer routes now.",
          "The forest is thinning. {CHANGE} this week. The stag is deeper in the remaining cover, working harder to stay sheltered.",
          "The good browse has moved to the edges of the woodland. {TICKER} {CHANGE}. The stag follows it, further from the center than it's comfortable with.",
        ],
        crisis: [
          "The woodland has opened completely in places. {TICKER} {CHANGE}. The stag stands in full light with nowhere to go for cover.",
          "The temperate woodland is barely there anymore. {CHANGE} this month. The stag is navigating what's left, one careful step at a time.",
          "The forest that made this place home is almost gone. {TICKER} down {CHANGE}. The stag is at the edge of what's left, looking at what isn't.",
        ],
      },
      inversion: "The woodland closes all at once — canopy sealing, understorey thickening, the clearings filling in. The stag walks through tunnels of green that didn't exist an hour ago. Its antlers fit perfectly. For thirty seconds the forest is exactly stag-shaped. Then the clearing reasserts itself.",
    },
  },

  woodland_edge: {
    id: 'woodland_edge',
    environment: 'Woodland Edge',
    creature: 'Fox',
    asset: 'Fox.gltf',
    strings: {
      creature: {
        flourishing: [
          "The fox has eaten before sunrise every morning for {DAYS} days. {TICKER} up {CHANGE}. It's running routes it doesn't need to run, just because it can.",
          "She's perfectly placed right now — close enough to the wood for cover, close enough to the field for food. {CHANGE} this week. She sits at the seam between them and feels entirely like herself.",
          "He's moving between the wood and the meadow all morning, not because he has to. {TICKER} up {CHANGE} this month. He's restless with how well everything is going.",
        ],
        stable: [
          "The fox makes its rounds — wood to field and back again. {CHANGE} this week. Everything is where it should be. She doesn't need to think about it.",
          "He found the voles in their usual tunnels and the rabbits at their usual distance. {TICKER} at {PRICE}. Same as yesterday. That's fine.",
          "She's where she has always worked best — at the exact edge between two things. {CHANGE} this month. Today the edge is holding.",
        ],
        uneasy: [
          "She's been watching from the treeline all morning, recalculating. {TICKER} {CHANGE}. The field was cut {DAYS} days ago and her usual approach routes are open now.",
          "He keeps checking the old vole locations even though they've moved. {CHANGE}. He knows they've moved. He checks anyway.",
          "She's shifted her range a small amount and hasn't quite acknowledged it to herself. {TICKER} {CHANGE}. There's a new scent on the eastern margin. She's giving it space.",
        ],
        stressed: [
          "She's deeper in the wood than she likes to be. {TICKER} {CHANGE}. She can't see the field from here. She keeps moving to the edge and pulling back.",
          "The margin he lives in has narrowed to a strip. {CHANGE} this week. He works it harder than he ever worked the full range. Gets less back.",
          "She's a fox that lives between two things and right now there's less of both. {TICKER} {CHANGE}. She hunts the strip. It keeps returning less.",
        ],
        crisis: [
          "The fox is in open field, fully exposed, moving fast with no particular destination. {TICKER} {CHANGE}. This is not what it was built for.",
          "She's sitting at the treeline in full daylight. {CHANGE} this month. The place she's mastered isn't there today. She waits for it to come back.",
          "He's been trying to find the edge for {DAYS} days. {TICKER} down {CHANGE}. The wood is the wood and the field is the field. The between-place is gone.",
        ],
      },
      environment: {
        flourishing: [
          "The woodland edge is wide and soft and full of movement. {TICKER} up {CHANGE}. The fox is in its element, working the margins with ease.",
          "The field-edge is full of voles and the cover is thick. {CHANGE} this week. The fox has everything it needs exactly where it needs it.",
          "The seam between wood and meadow has never been better. {TICKER} up {CHANGE} this month. The fox patrols it and finds it rich at every point.",
        ],
        stable: [
          "The woodland edge is holding steady. {CHANGE} this week. The fox patrols the seam between cover and open ground and finds it exactly where it left it.",
          "The margins are where they should be. {TICKER} at {PRICE}. The voles are in their tunnels. The fox is in its range. Everything where it should be.",
          "Nothing has changed at the edge. {CHANGE} this month. The fox moves through it in its usual patterns. The woodland edge allows it.",
        ],
        uneasy: [
          "The field was cut {DAYS} days ago and the edge looks different. {TICKER} {CHANGE}. The fox's usual approach routes are open now and it's adjusting.",
          "The vole tunnels have moved closer to the wood. {CHANGE}. The edge has shifted. The fox has noticed and is working the new geography.",
          "Something has changed at the margin. {TICKER} {CHANGE}. The woodland edge is still there — just arranged a little differently than before.",
        ],
        stressed: [
          "The field edge is shrinking. {TICKER} {CHANGE}. The space between wood and field — the space the fox was made for — is getting thin.",
          "The woodland is pressing in on one side and the open field offers no cover. {CHANGE} this week. The fox works a narrower and narrower strip.",
          "The margin between wood and meadow has compressed. {TICKER} {CHANGE}. The fox is hunting harder in less space and finding less in it.",
        ],
        crisis: [
          "The edge has disappeared. {TICKER} {CHANGE}. There is only the wood and only the field and the place that's neither is not here today.",
          "The woodland edge has collapsed. {CHANGE} this month. The fox moves through open ground, exposed, with no margin to work.",
          "The space the fox was built for does not exist right now. {TICKER} down {CHANGE}. The fox sits at the treeline and waits for the world to reorganize itself.",
        ],
      },
      inversion: "The margin widens to the width of a meadow — a whole new in-between that is neither wood nor field, just edge, edge all the way to the horizon. The fox runs it from end to end. For thirty seconds there is nothing but the threshold it was made for. Then the field and wood press back in.",
    },
  },

  open_grassland: {
    id: 'open_grassland',
    environment: 'Open Grassland',
    creature: 'Horse',
    asset: 'Horse.gltf',
    strings: {
      creature: {
        flourishing: [
          "The horse is running the last mile back for no reason but the running. {TICKER} up {CHANGE}. The grass is deep and the plain goes on and it wants to feel all of it.",
          "She's covered the whole range in {DAYS} days and found it full at every point. {CHANGE} this week. She gallops the perimeter at dawn just to feel how far it goes.",
          "He runs at full speed and then does it again. {TICKER} up {CHANGE} this month. He is not running from anything or toward anything. He is just running.",
        ],
        stable: [
          "The horse grazes in the morning and moves in the afternoon. {CHANGE} this week. The plain accommodates both. It always has.",
          "She knows every part of this grassland without thinking about it. {TICKER} at {PRICE}. Today is the same as yesterday. That's the point.",
          "He stays with the herd. The plain stays where it is. {CHANGE} this month. The horse doesn't need to check. It checks anyway.",
        ],
        uneasy: [
          "She stood at the water source longer than necessary this morning. {TICKER} {CHANGE}. It was still full. She stood there anyway.",
          "He's paying attention to a wind that isn't carrying the usual grass scent. {CHANGE}. He's not spooked. He's just paying attention.",
          "The herd drifted west {DAYS} days ago. {TICKER} {CHANGE}. Nobody led them. The horse followed and isn't sure why.",
        ],
        stressed: [
          "She covers twice the ground for the same grass. {TICKER} {CHANGE}. She's not stopping. She's just spending more than she's getting back.",
          "He knows which water sources are left and visits them in an order he didn't have {DAYS} weeks ago. {CHANGE} this week. The order keeps him going.",
          "The herd is compressing and the closeness is its own pressure. {TICKER} {CHANGE}. The horse that needed open land is in close quarters now.",
        ],
        crisis: [
          "The horse is standing in the center of the plain it has crossed a hundred times. {TICKER} {CHANGE}. The grass is gone. It doesn't move.",
          "She ran toward the others and reached them and had nothing to offer. {CHANGE} this month. They stood together on what's left of the range.",
          "He moves through the dust with his head low, looking for something below the surface. {TICKER} down {CHANGE}. {DAYS} days of this and still looking.",
        ],
      },
      environment: {
        flourishing: [
          "The grassland is open in every direction, deep and green. {TICKER} up {CHANGE}. The horse moves fast through it with nowhere it needs to be.",
          "The plain is wide and the grass is at its best right now. {CHANGE} this week. The horse has eaten and drunk and is running because the running feels good.",
          "The herd spreads across the widest range it has known. {TICKER} up {CHANGE} this month. Everything the grassland can give, it is giving.",
        ],
        stable: [
          "The grass is the right height today. {CHANGE} this week. The horse moves through it the way it always does, at the pace the plain asks for.",
          "The open grassland in its ordinary state. {TICKER} at {PRICE}. The horse knows it without looking. The plain knows the horse.",
          "The herd holds formation. The plain is where it always was. {CHANGE} this month. Nothing is being asked of anyone today.",
        ],
        uneasy: [
          "The eastern quarter of the range is drying at the margins. {TICKER} {CHANGE}. The herd has shifted west, without anyone deciding to lead.",
          "The wind is coming from a direction it doesn't usually come from. {CHANGE}. The grassland looks the same. The horse can feel it isn't.",
          "The plain is still wide, still there. {TICKER} {CHANGE}. But something has shifted these last {DAYS} days. The horse can feel it underfoot.",
        ],
        stressed: [
          "The range is drying faster than the herd can move. {TICKER} {CHANGE}. The horse covers more ground for less grass. It keeps moving.",
          "The water sources are going down. {CHANGE} this week. The grassland is becoming a smaller and smaller version of itself.",
          "The plain is half what it was. {TICKER} {CHANGE}. The horse works the remaining ground harder than it ever worked the full range.",
        ],
        crisis: [
          "The plain is dust. {TICKER} {CHANGE}. The horse moves through it with its head down. The ground is the same. The grass is not.",
          "The grassland has given everything it had. {CHANGE} this month. The herd is scattered across the edges of what remains.",
          "There is nothing left in the open grassland right now. {TICKER} down {CHANGE}. The horse stands in the middle of it and does not move.",
        ],
      },
      inversion: "Rain falls on every part of the plain simultaneously and the grass comes up in hours — thick, green, the length of a good season. The horse runs through it at full speed from one end to the other and back. For thirty seconds the plain has no edge. Then the sky clears and the sun starts its work again.",
    },
  },

  andean_highland: {
    id: 'andean_highland',
    environment: 'Andean Highland',
    creature: 'Alpaca',
    asset: 'Alpaca.gltf',
    strings: {
      creature: {
        flourishing: [
          "The alpaca has climbed above the cloud line and stayed there for {DAYS} days. {TICKER} up {CHANGE}. The ichu grass is thick and it has not needed to come down.",
          "Her fleece is thicker than last year and she sits in the wind at the ridge and lets the cold move through it. {CHANGE} this week. She feels exactly right.",
          "He's found the highest good pasture and is staying there. {TICKER} up {CHANGE} this month. The view is everything and the altitude costs nothing right now.",
        ],
        stable: [
          "The alpaca grazes the same ground it always has. {CHANGE} this week. The ground gives back the same amount. That's the arrangement and it holds.",
          "She eats her share and nothing shifts. {TICKER} at {PRICE}. The altitude is the right altitude. This is exactly what she was made for.",
          "He moves through the highland with the quiet of something that belongs here completely. {CHANGE} this month. Nothing is asked of him today that he can't give.",
        ],
        uneasy: [
          "She's moved slightly lower than usual and hasn't decided if it's temporary. {TICKER} {CHANGE}. The frost came {DAYS} days early. She noticed.",
          "He noticed the ichu is thinner at the highest pasture, without changing what he does about it yet. {CHANGE}. He's watching.",
          "She kept looking at the sky this morning. {TICKER} {CHANGE}. Something in the air pressure is wrong. The sky gave nothing back.",
        ],
        stressed: [
          "She's grazing lower than she has in {DAYS} years. {TICKER} {CHANGE}. The grass down here is different. She eats it anyway, because the high pasture is frozen.",
          "His fleece is damp — wet and grey cold instead of the dry still cold he was built for. {CHANGE} this week. This has not happened before.",
          "She keeps looking up at where the good pasture should be. {TICKER} {CHANGE}. The herd is below the cloud line for the first time this season.",
        ],
        crisis: [
          "She's on the valley floor, eating grass she doesn't recognize. {TICKER} {CHANGE}. She keeps looking up at the ridge she came from. The ridge is white and closed.",
          "The herd has scattered across lower elevations. {CHANGE} this month. The alpaca built for a specific altitude has none of it left.",
          "He stands on the lower slope and waits. {TICKER} down {CHANGE}. He has waited before. He is patient in the way things are patient when they have no other option.",
        ],
      },
      environment: {
        flourishing: [
          "The high plateau is generous this season — ichu thick to the very edge of the ridge. {TICKER} up {CHANGE}. The alpaca grazes above the clouds and doesn't need to come down.",
          "The Andean highland is giving its best right now. {CHANGE} this week. The alpaca has eaten well, its fleece is full, and the cold is the right kind.",
          "The altitude is perfect today — cold, still, exactly what the alpaca was built for. {TICKER} up {CHANGE} this month. The highland offers and the alpaca accepts.",
        ],
        stable: [
          "The Andean highland in its ordinary state — cold, still, unchanging. {CHANGE} this week. The alpaca grazes and the plateau holds.",
          "The ichu grass is neither abundant nor scarce. {TICKER} at {PRICE}. The alpaca eats and the highland keeps its deal.",
          "Everything is as it should be at altitude. {CHANGE} this month. The alpaca moves through the plateau and the plateau allows it.",
        ],
        uneasy: [
          "The frost came {DAYS} days early this month. {TICKER} {CHANGE}. The highland is showing the first signs of a harder season and the alpaca has moved slightly lower.",
          "The ichu is thinner at the top of the pasture than it should be. {CHANGE}. The highland is still giving — just a little less at the edges.",
          "Something in the atmosphere has shifted at altitude. {TICKER} {CHANGE}. The highland looks the same. The alpaca is paying closer attention to it.",
        ],
        stressed: [
          "The high pasture is frozen over. {TICKER} {CHANGE}. The alpaca is at lower elevation, grazing ground it doesn't know well.",
          "The Andean highland has turned difficult. {CHANGE} this week. The cold is the wrong kind — wet where it should be dry, grey where it should be clear.",
          "The altitude the alpaca was built for is no longer livable right now. {TICKER} {CHANGE}. The herd has come down and the good ground is locked away above them.",
        ],
        crisis: [
          "The highland is snow-locked. {TICKER} {CHANGE}. There is no pasture above the clouds today. The alpaca grazes the valley floor and keeps looking up.",
          "The Andean plateau has closed itself off. {CHANGE} this month. The alpaca is in country it wasn't built for, doing the best it can.",
          "Everything above the cloud line is gone. {TICKER} down {CHANGE}. The alpaca stands on the lower slope and looks at the ridge it cannot reach.",
        ],
      },
      inversion: "The snow melts from the highland all at once and the ichu comes up green to the very top of the ridge. The alpaca climbs without stopping. It reaches the highest point it has ever reached and the grass is there too. For thirty seconds the mountain has no ceiling. Then the cold returns and the alpaca begins its slow descent.",
    },
  },

  arid_scrubland: {
    id: 'arid_scrubland',
    environment: 'Arid Scrubland',
    creature: 'Donkey',
    asset: 'Donkey.gltf',
    strings: {
      creature: {
        flourishing: [
          "The donkey is moving slowly through blooming scrub, eating things it has never eaten before. {TICKER} up {CHANGE}. It's not sure about any of them. It keeps eating.",
          "She's drunk her fill every day for {DAYS} days and still checks the water level before leaving. {CHANGE} this week. Old habit. New water. Both true.",
          "He's standing in a green patch the scrubland has never offered before. {TICKER} up {CHANGE} this month. He stands there a long time. Then moves to another.",
        ],
        stable: [
          "The donkey knows where the water is. {CHANGE} this week. It covers its ground slowly, finds what it needs, asks for nothing more.",
          "She's made her peace with the arrangement here — sparse, predictable, survivable. {TICKER} at {PRICE}. Today the arrangement holds.",
          "He moves through the scrub at his own pace and finds what he expected to find. {CHANGE} this month. The arid land keeps its deal.",
        ],
        uneasy: [
          "He visited the waterhole twice this morning. {TICKER} {CHANGE}. It was still full both times. He checked anyway. He left anyway.",
          "She's been testing different routes through the scrub for {DAYS} days. {CHANGE}. Finding the same amounts of the same things in a different order.",
          "He's resting longer in the shade now, even when the shade isn't very good. {TICKER} {CHANGE}. Something about the heat is different. He's being careful with himself.",
        ],
        stressed: [
          "She knows which waterholes are left and has built a new route to reach them. {TICKER} {CHANGE}. The route is longer than the old one. She walks it.",
          "He stands at the thornbush in the afternoon and gets what shade it offers. {CHANGE} this week. It is not enough. He does it anyway.",
          "The forage she finds now requires more of her than it used to. {TICKER} {CHANGE}. The land isn't hostile. It's just becoming less. She keeps working it.",
        ],
        crisis: [
          "The donkey is standing in the last muddy waterhole in full sun, waiting. {TICKER} {CHANGE}. This is all there is right now. It waits.",
          "She covers the same ground out of pattern, not need. {CHANGE} this month. The scrubland has nothing left that she recognizes as food.",
          "He hasn't moved far in {DAYS} days. {TICKER} down {CHANGE}. The land asks nothing of him because there is nothing left to ask for. He stands and waits.",
        ],
      },
      environment: {
        flourishing: [
          "The scrubland has flowered after the rains. {TICKER} up {CHANGE}. The donkey moves through it slowly, eating what wasn't there last week.",
          "The waterholes are full. {CHANGE} this week. The arid scrubland is doing something generous and unusual. The donkey is quietly making the most of it.",
          "The scrub is green in patches it's never been green before. {TICKER} up {CHANGE} this month. The donkey stands in one of those patches and doesn't hurry away.",
        ],
        stable: [
          "The scrub is dry and the waterholes are where they always are. {CHANGE} this week. The donkey covers its ground. The arid land holds its side of things.",
          "The arid scrubland in its ordinary state — sparse, hot, and predictable. {TICKER} at {PRICE}. The donkey knows exactly where everything is.",
          "Nothing has changed in the scrubland. {CHANGE} this month. The donkey moves through it in its usual careful patterns.",
        ],
        uneasy: [
          "One of the usual waterholes is lower than it was {DAYS} days ago. {TICKER} {CHANGE}. Not gone — just lower. The donkey has noticed.",
          "The shade trees at the dry riverbed are thinner than they were. {CHANGE}. The scrubland is showing the first signs of something. The donkey rests there longer anyway.",
          "The scrub looks the same but the routes through it feel different. {TICKER} {CHANGE}. The donkey keeps testing them, finding the same amounts in different places.",
        ],
        stressed: [
          "The waterholes are down by half. {TICKER} {CHANGE}. The donkey knows which ones remain and has mapped a new route between them.",
          "The arid scrubland is drying from the edges inward. {CHANGE} this week. The donkey works harder for the same return. The land keeps shrinking.",
          "The shade is insufficient. The forage is thin. {TICKER} {CHANGE}. The scrubland is offering less of everything. The donkey covers more ground for less.",
        ],
        crisis: [
          "The last waterhole is a mud patch. {TICKER} {CHANGE}. The arid scrubland has given everything it had. The donkey stands in what's left.",
          "The scrubland has nothing left. {CHANGE} this month. The donkey moves through it out of habit, finding nothing, continuing anyway.",
          "There is no food and almost no water. {TICKER} down {CHANGE}. The arid land is fully arid now. The donkey waits in the shade of a thornbush and does not move far.",
        ],
      },
      inversion: "Rain falls on the scrubland for a full hour and the ground takes all of it. The waterholes fill before the donkey reaches them. It drinks for a long time, checks the level, drinks again. The scrub smells like it did once before, years back, after another rain it didn't expect. For thirty seconds the land is generous. The donkey doesn't trust it. Then the sun returns and they are even again.",
    },
  },
};
