import HomeLayout from "@/components/layouts/homeLayout"
import { NextPage } from "next"
import styles from "@/styles/home.module.scss"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"

const CommunityGuidelines: NextPage = () => {
	return (
		<HomeLayout>
			<Head>
				<title>{`Eyemark - Community Guidelines`}</title>
			</Head>
			<div className="py-16 px-7 sm:w-9/12 lg:w-6/12 mx-auto text-sm">
				<h1 className="text-2xl text-accepted medium text-center mb-10">
					Community Guidelines
				</h1>
				<span className={styles["title3"]}>
					Welcome to the Eyemark Community!
				</span>
				<br />
				<br />
				The Eyemark Community is an online forum where the citizens of
				Nigeria at home or in the diaspora can follow, view, discuss,
				and give feedback on the projects embarked on by the Federal
				Government of Nigeria. The goal is to enlighten members of the
				public, educate, and pass feedback to decision-makers in
				government. Non-citizens who love Nigeria are also welcome!
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>Our Core Values: </span>
				<br />
				<ul className="list-disc list-outside">
					<li>Respectful Dialogue (Freedom of Speech)</li>
					<li>Honest and Constructive Criticism</li>
					<li>Community/Nation Building </li>
					<li>Lawful Exchange of Ideas</li>
					<li>Thought Leadership </li>
					<li>Promoting Values and Culture</li>
				</ul>
				<br />
				To ensure that the goals of the Community are met, we request
				that you follow these guidelines to build and sustain a safe and
				free community for all Nigerians. Any content that offends these
				guidelines will be moderated appropriately and countermeasures
				may be taken against the user in some instances.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title2"]}>
					When Sharing Your Opinion:
				</span>
				<br />
				<br />
				<table className="border-collapse border border-slate-400">
					<thead>
						<tr className={styles["tr"]}>
							<th className={styles["th"]}>
								Values and Speeches That We Encourage
							</th>
							<th className={styles["th"]}>
								Speeches That We Frown At
							</th>
						</tr>
					</thead>
					<tbody>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								<span className="text-center medium">
									Respect.
								</span>
								<br />
								Always be respectful in addressing other users
								and persons not on the platform (whether public
								figures or not).
							</td>
							<td className={styles["td"]}>
								Use of abusive and derogatory words
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								<span className="text-center medium">
									Constructive criticism.
								</span>
								<br />
								Always try to conduct research and make verified
								statements before making an opinion. If you are
								not sure, it is better to be silent or state
								that your comments have not been verified.
								<br />
								<span className="medium">
									Remember: Fake news hurts us all
								</span>
							</td>
							<td className={styles["td"]}>
								Untrue statements to gather clout or incite
								others.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Avoid sentiments or biases when viewing or
								commenting on a project.
								<br />
								Pay attention to the quality, progress, value,
								and impact of the project rather than whipping
								up a conspiracy theory.
							</td>
							<td className={styles["td"]}>
								Rubbishing a project without qualitative
								analysis or criticising projects based on the
								political party of the executives involved.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Respond to posts or comments in a mature and
								respectful manner.
							</td>
							<td className={styles["td"]}>
								Attacking the personality of a user or non-user
								or taking posts personally.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Always make your comments without derogatory
								reference to another user’s origin, ethnicity,
								gender, colour or tribe, and so on.
								<br />
								<span className="medium">
									We take this seriously
								</span>
							</td>
							<td className={styles["td"]}>
								Making hateful, insensitive, sexual and
								discriminatory comments.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Do not repost, upvote or like discriminatory
								comments.
							</td>
							<td className={styles["td"]}>
								Posts that advertise products, services, links,
								spams, scams, political parties, political
								candidates, persons, businesses, etc
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Try to understand what a speaker is saying
								before replying.
							</td>
							<td className={styles["td"]}>
								Deliberately quoting a speaker or public figure
								out of context
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Encouraging peace and calm
							</td>
							<td className={styles["td"]}>
								Inciting violence or sedition. Verbal harassment
								and assault.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Positive and hopeful comments. The world already
								has so many bad things going on. Be kind.
							</td>
							<td className={styles["td"]}>
								Negative and distasteful comments. Curses, doom,
								and cruel statements.
								<br />
								Criticism and diversity of opinion are welcome.
							</td>
						</tr>
						<tr className={styles["tr"]}>
							<td className={styles["td"]}>
								Copying and pasting comments as your own.
								<br />
								Research and make good points instead.
							</td>
							<td className={styles["td"]}>
								Impersonating others.
								<br />
								Encouraging fraud or crime
							</td>
						</tr>
					</tbody>
				</table>
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title2"]}>
					When Posting Pictures or Videos and Others{" "}
				</span>
				<br />
				<br />
				<span className={styles["title4"]}>
					Do not post or repost content that infringes on the
					Intellectual Property rights of others without their
					permission.{" "}
				</span>
				<br />
				If you do, we will remove it without your permission and we may
				suspend your access if you repeat the same action.
				<br />
				<br />
				<span className={styles["title4"]}>
					Resist the urge to post or repost gory or violent media
					e.g., scenes of blood, etc.{" "}
				</span>
				<br />
				<br />
				<span className={styles["title4"]}>
					Avoid posting or reposting nude or x-rated content on the
					forum.
				</span>
				<br />
				If you do, we will take down your post without your permission
				and we may suspend your access if you repeat the same action.
				<br />
				<br />
				<span className={styles["title4"]}>
					Avoid posting or reposting old media as though it were the
					current state of things.
				</span>
				<br />
				If you do, we may remove the post without your permission.
				<br />
				<br />
				<span className={styles["title4"]}>
					Resist the urge to post your wares, products, logos,
					adverts, selfies, and so on, including other personal or
					business information.
				</span>
				<br />
				If you post marketing-related communication, we will remove it
				without your permission and may suspend your access if you
				repeat the same action.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title2"]}>
					Actions We May Explore if You Violate the Guidelines
				</span>
				<br />
				<br />
				Eyemark is a great community where people can freely express
				their opinions without offending{" "}
				<span className="medium">the rights</span> of others and their
				person.
				<br />
				This means that we may not take down a comment or post simply
				because it offends you or is negative because{" "}
				<span className="medium">
					we encourage diversity of opinion and constructive criticism
				</span>
				. However, if we assess a comment or user has violated these
				Guidelines, we may:
				<br />
				<br />
				<ul className="list-disc list-outside">
					<li>Take down the comment or post</li>
					<li>
						Suspend the User for as long as a week, two weeks or
						even lifetime access.
					</li>
					<li>
						Disable the features of a user to make further
						contributions
					</li>
					<li>Remove the access of the user to the Community</li>
				</ul>
				<br />
				These actions may be taken separately or jointly against a user.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title2"]}>
					Bringing it to our Attention
				</span>
				<br />
				<br />
				In case we miss a violation of these Guidelines by a user, you
				can draw our attention by flagging a comment or post or sending
				us a mail at{" "}
				<a href="mailto:info@eyemark.ng" className="hyperlink">
					info@eyemark.ng
				</a>
				<br />
				<br />
				Thank you for reading!
				<br />
				<br />
				<ul className="list-disc list-outside">
					<li>Respectful Dialogue</li>
					<li>Constructive Criticism</li>
					<li>Do not posts ads, nudes or violence materials</li>
				</ul>
			</div>
		</HomeLayout>
	)
}

export default CommunityGuidelines
