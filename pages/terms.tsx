import { homeRoutes } from "@/constants/AppRoutes/general.routes"
import { NextPage } from "next"
import Link from "next/link"
import styles from "@/styles/home.module.scss"
import HomeLayout from "@/components/layouts/homeLayout"
import Head from "next/head"

const Terms: NextPage = () => {
	return (
		<HomeLayout>
			<Head>
				<title>{`Eyemark - Terms of Use`}</title>
			</Head>
			<div className="py-16 px-7 sm:w-9/12 lg:w-6/12 mx-auto text-sm">
				<h1 className="text-2xl text-accepted medium text-center mb-3">
					Terms Of Use
				</h1>
				<span className={styles["title2"]}>INTRODUCTION</span>
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>What is Eyemark? </span>
				<br />
				<br />
				If you are seeking a community where there is a vast depository
				of projects undertaken by every tier and level of government in
				Nigeria, then you are in the right place. Welcome to the Eyemark
				Community! Eyemark also offers a forum for people interested in
				developmental projects in Nigeria to discuss these projects and
				share their valuable opinions in a respectable manner.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>
					What These Terms of Use Mean{" "}
				</span>
				<br />
				<br />
				These Terms of Use provide the conditions on which we provide
				any service or product related to Eyemark (“Platform”), except
				we state otherwise. It means that when you agree to the terms
				hereunder or use the Platform, these Terms of Use will become
				immediately applicable as a contract between you and us. <br />{" "}
				To use this Platform, we will require you to give us some of
				your personal information. Our{" "}
				<Link href={homeRoutes.privacy} className={styles["hyperlink"]}>
					Privacy Policy
				</Link>{" "}
				contains information on how we use and protect your personal
				information. <br /> The Eyemark Community is also moderated
				according to its{" "}
				<Link
					href={homeRoutes.community}
					className={styles["hyperlink"]}
				>
					Community Guidelines
				</Link>{" "}
				to ensure fairness and equity to all parties concerned.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>
					Information about us and how to contact us
				</span>
				<br />
				<br />
				<span className={styles["title4"]}>
					Who we are (“We/Us”).
				</span>{" "}
				We are <span className="medium">ZST Technologies</span> and we
				are duly registered under the laws of the Federal Republic of
				Nigeria.
				<br />
				<span className={styles["title4"]}>How to contact us.</span> You
				can contact us by calling our customer service team or by
				writing to us at info@eyemark.ng.
				<br />
				<br />
				<span className={styles["title4"]}>
					Our rights to make changes
				</span>
				<br />
				Changes to the Platform. We reserve the right to make updates to
				these Terms either to reflect regulatory or business needs. We
				will try as much as possible to notify you when the Terms change
				but it is your obligation to check how these updates affect your
				use of the Platform and whether you would like to continue.
				Updates made to these Terms will become effective upon{" "}
				<span className="medium">24 hours</span> after publication.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>Our Services</span>
				<br />
				<br />
				We are building a community that makes it possible for Nigerians
				and the various government agencies and parastatals to post,
				share, and comment on projects in Nigeria. This means that we
				provide connected features that allow you or any User to have
				access to this community.
				<br />
				<br />
				The Services that we provide also enable you to connect with
				other Users on the Platform.
				<br />
				<br />
				<span className={styles["title4"]}>
					Who is Eligible to Use Eyemark’s Services?
				</span>
				<br />
				Eyemark does not provide its Services or Platforms for persons
				less than 18years in Nigeria or below the legal age in whatever
				jurisdiction you access our Platform from. You agree to bear
				full responsibility for signing up and using Services provided
				on or related to Eyemark.
				<br />
				Where a person is using Eyemark on behalf of a corporate entity,
				the person undertakes that they have the legal authority to bind
				the corporate entity to a contract with Eyemark.
				<br />
				We reserve the right to restrict our Services to you if we
				discover that the information provided about you is untrue or
				misleading or against our Terms and Policies. In other
				instances, persons who have previously violated our Terms or
				Policies may be barred from registering another account.
				<br />
				<br />
				<span className={styles["title4"]}>
					Registering an Account on Eyemark
				</span>
				<br />
				We provide the Services described in these Terms only when you
				open an account on Eyemark and agree to the following
				conditions: Open only one account for use
				<br />
				<br />
				<ul className="list-disc list-outside">
					<li>
						Provide us with accurate information about yourself (or
						inform us where such information changes)
					</li>
					<li>
						Not use the Platform to perpetrate any criminal activity
						in Nigeria or the jurisdiction where you are registered
					</li>
					<li>
						Not to give or transfer your password or access to
						another person without our express permission
					</li>
					<li>
						Not to use the Platform for any other purpose other than
						that which it is intended
					</li>
					<li>
						To agree and use the Platform in accordance with other
						Eyemark Policies or Guidelines in operation
					</li>
				</ul>
				<br />
				<span className={styles["title4"]}>
					Disabling a Service or Your Account
				</span>
				<br />
				Where you would like to disable your account with us or
				discontinue the use of any Service, you can either utilise the
				functions on the Platform to disable such Service or your
				account or send an email to{" "}
				<a
					href="mailto:info@eyemark.ng"
					className={styles["hyperlink"]}
				>
					info@eyemark.ng
				</a>{" "}
				and we will process your request.
				<br />
				However, kindly note that your data may be archived according to
				our Privacy Policy unless you request a transfer and/or a
				partial or complete erasure.
				<br />
				Also, you agree that the rights that accrue to us prior to or
				upon the termination of your account will survive the
				determination of your account.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>
					What You Can Share or Not{" "}
				</span>
				<br />
				<br />
				Eyemark encourages Users to express their freedom of speech and
				good citizenry, however, not at the expense of other Users or
				persons or national symbols. To this end, you agree that the
				content you share will adhere to the following rules:
				<br />
				<br />
				<ol className="list-decimal list-outside">
					<li>
						Not violate these Terms or any of the Eyemark Policies
						or Guidelines in operation at the time
					</li>
					<li>
						Not be discriminatory, insensitive, misleading,
						fraudulent or unlawful
					</li>
					<li>
						Not to contain any marketing of any product or service
						without our consent (Kindly view our Community
						Guidelines for more directions)
					</li>
					<li>
						Not to contain any racial or tribal or ethnic slurs or
						incite any group or community of people
					</li>
					<li>Not to expose political or state secrets</li>
					<li>
						Not to attack or defame a person (whether a user or not)
						or his origin
					</li>
					<li>
						Not contain any content that infringes any Intellectual
						Property right of any person or entity or government
					</li>
					<li>
						You may not upload viruses or malicious code, or do
						anything that could disable, overburden or impair the
						proper working or appearance of our Products.
					</li>
					<li>
						Not to incite civil unrest or secession or felonious
						crimes
					</li>
				</ol>
				<br />
				You agree that Eyemark may remove or moderate or restrict access
				to any content that violates the above rules. Where your post is
				removed, moderated or restricted, you may write to us to appeal
				the decision.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>
					Licences and permissions{" "}
				</span>
				<br />
				<br />
				Eyemark recognises that some of the content you post or share on
				its Platform may be protected by Intellectual Property laws. By
				posting or sharing on Eyemark, you do not assign the IP rights
				to us i.e., you are able to reshare, withdraw or use your work
				or content anywhere else. However, we need some form of licence
				and permissions to be able to keep the Community growing and to
				provide our services:
				<br />
				<br />
				<ol className="list-decimal list-outside leading-relaxed">
					<li>
						You agree that whenever you post or share content (such
						as a photo, video, text, etc.), you grant us a
						non-exclusive, transferable, sub-licensable,
						royalty-free and worldwide licence to host, use,
						distribute, modify, run, copy, publicly perform or
						display, translate and create derivative works of your
						content.
					</li>
					<li>
						You agree that we can use your name, profile picture and
						information about your actions with ads and sponsored
						content: You give us permission to use your name and
						profile picture and information about actions that you
						have taken on Eyemark next to or in connection with ads,
						offers and other sponsored content that we display
						across our Services, without any compensation to you.
					</li>
					<li>
						You agree that this licence includes the right for
						Eyemark to make the shared or uploaded content available
						to other companies, organisations, business partners, or
						individuals who collaborate with us for the syndication,
						broadcast, communication and making available to the
						public, distribution or publication of the content on
						the Platform or through other media or distribution
						methods.
					</li>
					<li>
						You grant the permissions to other users of the Platform
						to use, copy, reproduce, adapt, modify, create
						derivative works from, publish, transmit, display, and
						distribute, translate, communicate and make available to
						the public the content, subject to our Terms of Service.
						Except as expressly provided in these Terms of Use, the
						granted permissions will not confer the right for you to
						use automated technology to copy or post questions and
						answers or to aggregate questions and answers for the
						purpose of making derivative works.
					</li>
					<li>
						You agree that Eyemark may preserve content which you
						post, share or upload and in certain circumstances, may
						also disclose the content and related information if
						required to do so by law or to enforce these Terms of
						Service or for Eyemark to respond to claims that any of
						your content has violated the rights of third parties or
						to detect, prevent, or otherwise address fraud, security
						or technical issues or to defend the interests of
						Eyemark.
					</li>
					<li>
						You agree that we shall have a non-exclusive authority
						to take enforcement action against any unauthorised use
						by third parties of any content outside of the Platform
						or in violation of our Terms.
					</li>
				</ol>
				<br />
				<span className={styles["title4"]}>
					Our Intellectual Property rights
				</span>
				<br />
				You acknowledge that except third party content, Eyemark owns
				all rights, title, and interest in and to the Platform, the
				related source code and machine-readable, compiled Object Code,
				related application program interfaces (each, an{" "}
				<span className="medium">“API”</span>), Derivative Works, and
				all ideas and concepts embodied therein, and all worldwide,
				current or future, copyright, trademark rights, patent rights,
				trade secrets, right of publicity, goodwill, and all other
				intellectual property rights as may exist now and/or hereafter
				come into existence, and all renewals, continuations, wherever
				located.
				<br />
				Where you intend to use any of our content protected by
				Intellectual Property Laws, you agree to always obtain our
				written permission to modify, create derivative works of,
				decompile or otherwise attempt to extract source code from us.
				<br />
				<br />
				<br />
				{/*  */}
				<span className={styles["title3"]}>Other important terms</span>
				<br />
				<br />
				<span className={styles["title4"]}>
					We may transfer this agreement to someone else.
				</span>{" "}
				We may transfer our rights and obligations under these terms to
				another organisation.
				<br />
				<br />
				<span className={styles["title4"]}>
					You need our consent to transfer your rights to someone else
					(except that you can always transfer our guarantee).
				</span>{" "}
				You may only transfer your rights or your obligations under
				these terms to another person if we agree to this in writing.
				<br />
				<br />
				<span className={styles["title4"]}>
					If a court finds part of this contract illegal, the rest
					will continue in force.
				</span>{" "}
				Each of the paragraphs of these terms operates separately. If
				any court or relevant authority decides that any of them are
				unlawful, the remaining paragraphs will remain in full force and
				effect.
				<br />
				<br />
				<span className={styles["title4"]}>No waiver.</span> If we do
				not insist immediately that you do anything you are required to
				do under these terms, or if we delay in taking steps against you
				in respect of your breaking this contract, that will not mean
				that you do not have to do those things and it will not prevent
				us taking steps against you at a later date. For example, if you
				miss a payment and we do not chase you but we continue to
				provide requested services, we can still require you to make the
				payment at a later date.
				<br />
				<br />
				<span className={styles["title4"]}>Limits on liability</span>
				<br />
				To the extent permitted by law, we also disclaim all warranties,
				whether express or implied, including the implied warranties of
				merchantability, fitness for a particular purpose, title and
				non-infringement. We do not control or direct what people and
				others do or say, and we are not responsible for their actions
				or conduct (whether online or offline) or any content that they
				share (including offensive, inappropriate, obscene, unlawful and
				other objectionable content).
				<br />
				We cannot predict when issues may arise with our Services.
				Accordingly, our liability shall be limited to the fullest
				extent permitted by applicable law, and under no circumstances
				will we be liable to you for any lost profits, revenues,
				information or data, or consequential, special, indirect,
				exemplary, punitive or incidental damages arising out of or
				related to these Terms or the Facebook Products, even if we have
				been advised of the possibility of such damages.
				<br />
				<br />
				<span className={styles["title4"]}>
					Which laws apply to this contract and where you may bring
					legal proceedings.
				</span>{" "}
				These terms are governed by the laws of the Federal Republic of
				Nigeria and Lagos State in particular and either party can bring
				legal proceedings in respect of the Services in the courts in
				Nigeria.
				<br />
				<br />
				<span className={styles["title4"]}>
					Electronic Signature:
				</span>{" "}
				You acknowledge and agree to the use of electronic
				signature/consent in respect to transactions and documents. You
				also agree that your electronic signature is the legal
				equivalent of your manual signature on this term. You further
				affirm that consent such as ticking “consent boxes” shall be
				treated as an electronic signature under these Terms and shall
				be legally binding on you.
			</div>
		</HomeLayout>
	)
}

export default Terms
