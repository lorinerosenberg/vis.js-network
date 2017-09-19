//data
var info = {
    1: {
        'id' : 1,
        'parent': null,
        'children': [10],
        'shortText': 'Are universal human rights really universal?',
        'fullText': 'Are universal human rights really universal?',
        'group': 'question'
    },
    10: {
        'id' : 10,
        'parent': 1,
        'children': [100],
        'shortText': 'General Principals: Can we ensure that AI is transparent?',
        'fullText': 'General Principals: Can we ensure that AI is transparent?',
        'group': 'answer'
    },
    100: {
        'id' : 100,
        'parent': 10,
        'children': [1000,1001,1002,1003,1004,1005,1006],
        'shortText': 'Etzioni (NB- Member of IEEE committee...',
        'fullText': 'Etzioni (NB- Member of IEEE committee, LinkedIn )- yes - an A.I. system must clearly disclose that it is not human. As we have seen in the case of bots — computer programs that can engage in increasingly sophisticated dialogue with real people — society needs assurances that A.I. systems are clearly labeled as such. In 2016, a bot known as Jill Watson, which served as a teaching assistant for an online course at Georgia Tech, fooled students into thinking it was human. A more serious example is the widespread use of pro-Trump political bots on social media in the days leading up to the 2016 elections, according to researchers at Oxford.',
        'group': 'supporting'
    },
    1000: {
        'id' : 1000,
        'parent': 100,
        'children': [10000,10001,10002],
        'shortText': 'If so then we should also have statutory labels...',
        'fullText': 'If so then we should also have statutory labels whenever there is photoshop or comedic dubbing',
        'group': 'disproving'
    },
    1001: {
        'id' : 1001,
        'parent': 100,
        'children': null,
        'shortText': 'That should also include automated transcripts...',
        'fullText': 'That should also include automated transcripts from voice recognition on videos',
        'group': 'supporting'
    },
    1002: {
        'id' : 1002,
        'parent': 100,
        'children': null,
        'shortText': '#Feedback- a place for questions/comments...',
        'fullText': "#Feedback- a place for questions/comments (maybe it's here and I missed it). (1) To question the question (questions often contain assumptions (2) to seek clarification of what others stated above - what if it's vague or unclear? (3) to say if you above said X doesn't that mean Y.",
        'group': 'supporting'
    },
    1003: {
        'id' : 1003,
        'parent': 100,
        'children': null,
        'shortText': 'This already happens with photoshop...',
        'fullText': "This already happens with photoshop. What is unethical here is misleading humans about how humans look. If so for physical looks, how much more so for political influence",
        'group': 'supporting'
    },
    1004: {
        'id' : 1004,
        'parent': 100,
        'children': [10040],
        'shortText': 'Yes. Celebrity bots are very popular...',
        'fullText': 'Yes. Celebrity bots are very popular with teenagers.',
        'group': 'supporting'
    },
    1005: {
        'id' : 1005,
        'parent': 100,
        'children': [10050,10051,10052],
        'shortText': 'This argument is a red herring...',
        'fullText': 'This argument is a red herring. AI systems / bots prefer to interact with bots more than humans since there is less chance of miscommunication. The core issue is not bots declaring they are thus to humans, the core issue is that letting in bots to make decisions for us bleeds dry our own human autonomy',
        'group': 'supporting'
    },
    1006: {
        'id' : 1006,
        'parent': 100,
        'children': null,
        'shortText': 'To take an extreme point...',
        'fullText': 'To take an extreme point- is there a difference between a very scripted conversation on Liveperson with a human agent and a bot?',
        'group': 'disproving'
    },
    10000: {
        'id' : 10000,
        'parent': 1000,
        'children': null,
        'shortText': '#Feedback right here I might want...',
        'fullText': "#Feedback right here I might want to bring in another expert and not necessarily show them the thread above. e.g. start another question and link it to above. This is where it gets interesting who has admin rights, who can confer, can that person hide parts of the ​conversation. My intuition is that whoever owns the license has admin or group of admins can see everything and they control groups of who sees daughter questions. It's probably later down your dev path, from a user view even in enterprise, say intel, these 'Chinese Walls' could be a user feature to consider.",
        'group': 'supporting'
    },
    10001: {
        'id' : 10001,
        'parent': 1000,
        'children': [100010,100011],
        'shortText': 'No photoshop should not be included...',
        'fullText': "No photoshop should not be included. If a person wants to adjust an image - say apply a filter- why should that be included? It's not a machine",
        'group': 'disproving'
    },
    10002: {
        'id': 10002,
        'parent': 1000,
        'children': [100020],
        'shortText': 'Disagree. If we take the example of photoshop...',
        'fullText': "Disagree. If we take the example of photoshop, the regulation varies from country to country. Australia for example does not regulate whereas UK and Israel does. Even if Etzioni is right for bots, it does not mean we need to change the law for photoshop",
        'group': 'disproving'
    },
    10040: {
        'id' : 10040,
        'parent': 1004,
        'children': [100400,100401],
        'shortText': "Taking Etzioni's point further...",
        'fullText': "Taking Etzioni's point further, celebrity bots should be banned from minors. They cannot differentiate between fantasy and reality.",
        'group': 'supporting'
    },
    10050: {
        'id' : 10050,
        'parent': 1005,
        'children': null,
        'shortText': '#Feedback. This point is not arguing...',
        'fullText': "#Feedback. This point is not arguing the mother point right or wrong, it is stating that the relevance of the mother point is weak. In essence, ​the author is saying- when you look at this topic, give the [issue of human autonomy] more weight than [issue of AI transparency]. Not sure if helpful, am capturing as go along before forget that sometimes experts will find more passion to disagree on principles relative to claims/evidence accumulation. I see it's flagged as debatable which is pretty great!",
        'group': 'supporting'
    },
    10051: {
        'id' : 10051,
        'parent': 1005,
        'children': null,
        'shortText': "love that this recognizes it's debatable!",
        'fullText': "love that this recognizes it's debatable!",
        'group': 'supporting'
    },
    10052: {
        'id' : 10052,
        'parent': 1005,
        'children': null,
        'shortText': 'No, it is more relevant to look at AI...',
        'fullText': "No, it is more relevant to look at AI transparency. We can't fight against the fact that bots will prefer to communicate with bots.",
        'group': 'disproving'
    },
    100010: {
        'id' : 100010,
        'parent': 10001,
        'children': [1000100],
        'shortText': "It's the same principle as Etzioni...",
        'fullText': "It's the same principle as Etzioni. A bot is unethical because a person is engaging with an algorithm thinking it is a real human and yet it is imitating a human. If we are to be consistent, it should be the same for photoshop.",
        'group': 'disproving'
    },
    100011: {
        'id' : 100011,
        'parent': 10001,
        'children': null,
        'shortText': "Well photoshopping is already labeled in Israel.",
        'fullText': "Well photoshopping is already labeled in Israel.",
        'group': 'disproving'
    },
    100020: {
        'id': 100020,
        'parent': 10002,
        'children': null,
        'shortText': '#Feedback in the above the quality of the...',
        'fullText': "#Feedback in the above the quality of the research is arguably higher than other places as it is academic, as opposed to news reports in other places. A user may want to flag that.",
        'group': 'supporting'
    },
    100400: {
        'id' : 100400,
        'parent': 10040,
        'children': null,
        'shortText': "#Feedback above somebody takes...",
        'fullText': "#Feedback above somebody takes the mother comment point of view and extrapolates it to form a more specific focused view and backs that with evidence. In enterprise this might show up as: e..g Mother comment. GBPUSD will soften Q3 2017 . Daughter comment. Yes, it has a 80% chance of weakening by more than 30%, see this research.",
        'group': 'supporting'
    },
    100401: {
        'id' : 100401,
        'parent': 10040,
        'children': [1004010,1004011],
        'shortText': "Flag for further study...",
        'fullText': "Flag for further study: at what age is there a ​consensus for when children become adults and can distinguish fantasy from reality. If there is a cut off point, should this impact how we deal with AI transparency?",
        'group': 'supporting'
    },
    1000100: {
        'id' : 1000100,
        'parent': 100010,
        'children': [10001000,10001001],
        'shortText': "Two different things....",
        'fullText': "Two different things. Misleading humans that a bot is human when it is not is unethical because the free will opinion of other humans influence us. Such political bots can sway public opinion and influence human affairs. Misrepresenting the human form from photoshop can influence how we feel we should look like. But it does not have the same societal influence as political bots. Therefore, photoshopping is not ethically equivalent to bots imitating humans.",
        'group': 'disproving'
    },
    1004010: {
        'id' : 1004010,
        'parent': 100401,
        'children': null,
        'shortText': "# Feedback from above...",
        'fullText': "# Feedback from above. This is a prompt to possibly start a new question based on thread above. In GBPUSD example it might show up as: Flag for further study. If we have a 80% chance of GBPUSD weakening more than 30%, how will that impact bonds?",
        'group': 'supporting'
    },
    1004011: {
        'id' : 1004011,
        'parent': 100401,
        'children': [10040110],
        'shortText': "Yes, there is a ​clear precedent for this...",
        'fullText': "Yes, there is a ​clear precedent for this in advertising​ to children.",
        'group': 'supporting'
    },
    10001000: {
        'id' : 10001000,
        'parent': 1000100,
        'children': null,
        'shortText': "#Feedback. In this longer thread there's....",
        'fullText': "#Feedback. In this longer thread there's a claim and then a denial and then a denial on the denial which makes it a positive. Wondering whether system should do something like make the granddaughter (double negative) a grandmother and swap colors, if that makes sense. The reason as user I did not post the granddaughter in the level of the grandmother is because it is arguing an ever more specific case, so it would not make sense in the logic of the conversation when I write it to put it at grandmother level.",
        'group': 'supporting'
    },
    10001001: {
        'id' : 10001001,
        'parent': 1000100,
        'children': null,
        'shortText': "Disagree. It seems you say that influence....",
        'fullText': "Disagree. It seems you say that influence over a person's politics has more ethical weight than influence over how a person feels about their body. This is not proven to be true.",
        'group': 'disproving'
    },
    10040110: {
        'id' : 10040110,
        'parent': 1004011,
        'children': null,
        'shortText': "#Feedback. Much further down your dev cycle...",
        'fullText': "#Feedback. Much further down your dev cycle, it could be nice to consider a way to invite people into discussion midway when their expert opinion is valid and to have an onboarding email that shows them discussion so far and asks their opinion. In this case someone might email Commercial Free Childhood org mentioned in article cited above. They would get summary of discussion according to privacy settings and then X wanted to know if you have any insights supporting or disproving the claim [there is clear precedent for this in advertising for children]. Also, I am thinking this is a way to help make your SW users go viral. People like being cited and are likely to respond.",
        'group': 'supporting'
    }

};