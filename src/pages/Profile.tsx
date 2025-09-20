import ProfileHeader from "@components/Profile/ProfileHeader";


export default function Profile() {

    const user = { 
        name: "Sara Garrofé",
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
            <ProfileHeader name={user.name} email={user.email} avatarUrl={user.avatarUrl} joinedDate={user.joinedDate} onEdit={handleEdit} />
        </main>
    )
}