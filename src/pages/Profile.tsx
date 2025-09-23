import ProfileHeader from "@components/Profile/ProfileHeader";
import ProfileActions from "@components/Profile/ProfileActions";

export default function Profile() {

    const user = { 
        name: "Sara",
        email: "example@example",
        avatarUrl: "https://placehold.co/80x80",
        joinedDate: "Septiembre 2025"
    }

    const handleEdit = () => {
        // TO DO: navegar a /profile/edit 
        alert('Navegar a /profile/edit')
    }
    return (
        <main className="container py-3">
            <ProfileHeader name={user.name} avatarUrl={user.avatarUrl} />
            <ProfileActions />
        </main>
    )
}