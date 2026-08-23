import os
import json
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)


# ==============================
# GOOGLE OAUTH CONFIGURATION
# ==============================

app.config['GOOGLE_CLIENT_ID'] = os.environ.get("GOOGLE_CLIENT_ID")
app.config['GOOGLE_CLIENT_SECRET'] = os.environ.get("GOOGLE_CLIENT_SECRET")

app.secret_key = os.environ.get("FLASK_SECRET_KEY")

app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

app.config['REMEMBER_COOKIE_SECURE'] = True
app.config['REMEMBER_COOKIE_HTTPONLY'] = True
app.config['REMEMBER_COOKIE_SAMESITE'] = 'Lax'

# ==============================
# DATABASE CONFIGURATION
# ==============================
db_url = os.environ.get('DATABASE_URL')

if db_url and db_url.startswith('postgres://'):
    db_url = db_url.replace('postgres://', 'postgresql://', 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url or 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

login_manager = LoginManager(app)
login_manager.login_view = 'home'

oauth = OAuth(app)

google = oauth.register(
    name='google',
    client_id=app.config['GOOGLE_CLIENT_ID'],
    client_secret=app.config['GOOGLE_CLIENT_SECRET'],
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)
print("GOOGLE CLIENT ID =", app.config["GOOGLE_CLIENT_ID"])
# ==========================================
# FLASK-LOGIN USER LOADER
# ==========================================
@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

# ==========================================
# DATABASE MODELS
# ==========================================
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    role = db.Column(db.String(50), default="User")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    name = db.Column(db.String(150), nullable=True)
    profile_pic = db.Column(db.String(300), nullable=True)
    
    # Persistent database fields bound to the user's email account
    cart_data = db.Column(db.Text, default='[]')
    wishlist_data = db.Column(db.Text, default='[]')

    def __repr__(self):
        return f"<User {self.id} - {self.email} ({self.role})>"

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(50), unique=True, nullable=False)
    user_email = db.Column(db.String(120), nullable=False)
    items_json = db.Column(db.Text, nullable=False)
    total_amount = db.Column(db.String(20), nullable=False)
    payment_method = db.Column(db.String(50), nullable=True, default="COD")
    shipping_address = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), default="Confirmed")
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Order {self.order_number} - {self.user_email}>"

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String(200), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"{self.id} - {self.title}"

class SupportMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default="Pending")

    def __repr__(self):
        return f"{self.id} - {self.email}"

# GOOGLE OAUTH ROUTES
# ==========================================
@app.route('/login/google')
def google_login():
    redirect_uri = 'https://sampx-fs-club.onrender.com/login/google/callback'
    return google.authorize_redirect(redirect_uri)


@app.route('/login/google/callback')
def google_callback():
    try:
        token = google.authorize_access_token()
        user_info = token.get('userinfo')
        if not user_info or not user_info.get('email'):
            flash("Failed to retrieve user information from Google.", "danger")
            return redirect(url_for('home'))
        
        user_email = user_info['email']
        user_name = user_info.get('name', user_email.split('@')[0])
        user_pic = user_info.get('picture')

        user = User.query.filter_by(email=user_email).first()
        if not user:
            user = User(
                email=user_email,
                name=user_name,
                profile_pic=user_pic,
                password=bcrypt.generate_password_hash("oauth_google_user").decode('utf-8'),
                role="User"
            )
            db.session.add(user)
            db.session.commit()
        else:
            if not user.name:
                user.name = user_name
            if not user.profile_pic:
                user.profile_pic = user_pic
            db.session.commit()

        login_user(user, remember=True)
        return redirect(url_for('home'))
    except Exception as e:
        flash("Google authentication failed.", "danger")
        return redirect(url_for('home'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("You have been logged out.", "info")
    return f"""
    <script>
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "{url_for('home')}";
    </script>
    """

@app.route('/account')
@login_required
def account():
    return render_template('account.html')

@app.route('/account/edit', methods=['POST'])
@login_required
def edit_profile():

    name = request.form.get('name', '').strip()

    if not name:
        flash("Name cannot be empty.", "danger")
        return redirect(url_for('account'))

    if len(name) > 150:
        flash("Name is too long.", "danger")
        return redirect(url_for('account'))

    current_user.name = name

    db.session.commit()

    flash("Profile updated successfully.", "success")

    return redirect(url_for('account'))

@app.route('/settings')
@login_required
def settings():
    return render_template('settings.html')

# ==========================================
# PUBLIC & ORDER ROUTES
# ==========================================
@app.route("/")
def home():
    if Todo.query.count() == 0:
        todo = Todo(title="SAMpx FS CLUB", content="Welcome to the SAMpx FS CLUB!")
        db.session.add(todo)
        db.session.commit()
        
    allTodo = Todo.query.all()
    return render_template("index.html", allTodo=allTodo, page_title="Home")

@app.route('/orders')
def orders():
    if current_user.is_authenticated:
        db_orders = Order.query.filter_by(user_email=current_user.email).order_by(Order.date_created.desc()).all()
        user_orders = []
        for o in db_orders:
            try:
                # Safely parse JSON items
                parsed_items = json.loads(o.items_json) if isinstance(o.items_json, str) else o.items_json
                if not isinstance(parsed_items, list):
                    parsed_items = []
            except:
                parsed_items = []

            user_orders.append({
                "id": o.order_number,
                "date": o.date_created.strftime('%d %b %Y') if o.date_created else "",
                "product_list": parsed_items,  # Changed from "items" to "product_list" to avoid SQLAlchemy conflict
                "total": o.total_amount,
                "status": o.status
            })
        return render_template('orders.html', orders=user_orders)
    return render_template('orders.html', orders=[])

@app.route("/help")
def help():
    return render_template("help.html")

@app.route("/submit-support", methods=["POST"])
def submit_support():
    email = request.form.get("email")
    message = request.form.get("message")
    
    if email and message:
        support = SupportMessage(email=email, message=message)
        db.session.add(support)
        db.session.commit()

    return redirect(url_for("help"))
@app.route('/admin')
@login_required
def admin():
    if current_user.role != 'Admin':
        flash("Access denied. Admin privileges required.", "danger")
        return redirect(url_for('home'))

    allTodo = Todo.query.order_by(
        Todo.date_created.desc()
    ).all()

    support_messages = SupportMessage.query.order_by(
        SupportMessage.date_created.desc()
    ).all()

    return render_template(
        "admin.html",
        allTodo=allTodo,
        support_messages=support_messages
    )

@app.route("/add-record", methods=["POST"])
def add_record():
    title = request.form.get("title")
    content = request.form.get("content")
    
    if title and content:
        new_entry = Todo(title=title, content=content)
        db.session.add(new_entry)
        db.session.commit()
 
    return redirect(url_for("product"))

@app.route("/delete-message/<int:id>", methods=["POST"])
def delete_message(id):
    message = db.session.get(SupportMessage, id)
    if message:
        db.session.delete(message)
        db.session.commit()
    return redirect(url_for("product"))

# ==========================================
# API ENDPOINTS FOR CART & WISHLIST SYNCHRONIZATION
# ==========================================
@app.route('/api/cart', methods=['GET', 'POST'])
def api_cart():
    if not current_user.is_authenticated:
        return jsonify({"success": False, "error": "Login required"}), 401
        
    if request.method == 'POST':
        data = request.get_json() or {}
        current_user.cart_data = json.dumps(data.get('cart', []))
        db.session.commit()
        return jsonify({"success": True, "message": "Cart saved successfully"})
    
    try:
        cart_items = json.loads(current_user.cart_data)
    except:
        cart_items = []
    return jsonify({"success": True, "cart": cart_items})

@app.route('/api/wishlist', methods=['GET', 'POST'])
def api_wishlist():
    if not current_user.is_authenticated:
        return jsonify({"success": False, "error": "Login required"}), 401
        
    if request.method == 'POST':
        data = request.get_json() or {}
        current_user.wishlist_data = json.dumps(data.get('wishlist', []))
        db.session.commit()
        return jsonify({"success": True, "message": "Wishlist saved successfully"})
    
    try:
        wishlist_items = json.loads(current_user.wishlist_data)
    except:
        wishlist_items = []
    return jsonify({"success": True, "wishlist": wishlist_items})
@app.route('/api/place-order', methods=['POST'])
def place_order():
    if not current_user.is_authenticated:
        return jsonify({"success": False, "error": "Login required"}), 401

    data = request.get_json() or {}

    order_id = data.get("id")
    items = data.get("items", [])
    total = data.get("total", "₹0")
    customer = data.get("customer", {})

    print("ORDER ITEMS:", items)

    if not order_id or not items:
        return jsonify({
            "success": False,
            "error": "Invalid order payload"
        }), 400

    new_order = Order(
        order_number=order_id,
        user_email=current_user.email,
        items_json=json.dumps(items),
        total_amount=total,
        payment_method=customer.get("paymentMethod", "COD"),
        shipping_address=customer.get("address", "")
    )

    db.session.add(new_order)

    current_user.cart_data = '[]'

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Order saved successfully"
    })

@app.route("/api/add-record", methods=["POST"])
def api_add_record():
    data = request.get_json() or {}
    title = data.get("title")
    content = data.get("content")

    if not title or not content:
        return jsonify({"success": False, "error": "Missing fields"}), 400

    new_entry = Todo(title=title, content=content)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({
        "success": True, 
        "id": new_entry.id, 
        "date": new_entry.date_created.strftime('%Y-%m-%d %H:%M')
    })

# ==========================================
# APPLICATION ENTRY 


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000)),
        debug=False
    )