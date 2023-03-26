import { auth, firestore, googleProvider } from "../lib/firebase";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";

export default function Enter(props) {
    const { user, username } = useContext(UserContext);

    // 1. User signed out <SignInButton />
    // 2. User signed in, but missing username <UsernameForm />
    // 3. User signed in, has username <SignOutButton />
    return (
        <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>
    );
}

// sign in with Google botton
function SignInButton() {
    const signInWithGoogle = async () => {
        await auth.signInWithPopup(googleProvider);
    };

    return (
        <>
            <button className="btn-google" onClick={signInWithGoogle}>
                <img src={"/google.png"} alt="google logo" /> Sign in with Google
            </button>
            <button onClick={() => auth.signInAnonymously()}>Sign in Anonymously</button>
        </>
    );
}

// sign out button
function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
    const [formValue, setFormValue] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }
        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    // Hit the firestore database to check if username is available
    // If available, set isValid to true
    const checkUsername = useCallback(
        debounce(async (username) => {
            if (username.length >= 3) {
                const ref = firestore.doc(`usernames/${username}`);
                const { exists } = await ref.get();
                console.log("Firestore read executed!");
                setIsValid(!exists);
                setLoading(false);
            }
        }, 500),
        []
    );

    const onSubmit = async (e) => {
        "use strict";

        return (
            !username && (
                <section>
                    <h3>Choose Username</h3>
                    <form onSubmit={onSubmit}>
                        <input
                            name="username"
                            placeholder="username"
                            value={formValue}
                            onChange={onChange}
                        />
                        <button type="submit" className="btn-green" disabled={!isValid}>
                            choose
                        </button>
                        <h3>Debug State</h3>
                        <div>
                            Username: {formValue}
                            <br />
                            Loading: {loading.toString()}
                            <br />
                            Username Valid: {isValid.toString()}
                        </div>
                    </form>
                </section>
            )
        );
    };
}
