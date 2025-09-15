

export default function ProfileHeader() {
    return (
        <header className="profile-header d-flex align-items-center p-3 mb-4 border-bottom">
            <img 
                src="https://placehold.co/80x80" 
                alt="Profile" 
                className="profile-header__avatar rounded-circle me-3" 
            />
            <div className="profile-header__info text-start">
                <h2 className="profile-header__name mb-1">Name </h2> 
                <p className="profile-header__email text-muted mb-0">
                    Email account
                </p>
            </div>    
        </header>
    )
}